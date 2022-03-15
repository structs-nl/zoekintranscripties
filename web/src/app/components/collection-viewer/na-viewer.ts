import { IToken, ITranscription } from '../../services/transcription.service';
import { Placement, Rect, Viewer } from 'openseadragon';
interface Params {
  viewer: Viewer;
  window: Window;
  total: number;
  items: ITranscription[];
  onChangeIndex: (index: number) => void;
  getScanUrl: (id: string) => string;
}

interface LoadParams {
  items: ITranscription[];
  offset?: number;
  activeIndex?: number;
  refreshOverlays?: boolean;
  prepend?: boolean;
  immediately?: boolean;
}

/**
 * An OpenSeaDragon helper class to help with adding images and overlays
 */
export class NaViewer {
  public viewerItems: ITranscription[] = [];
  private viewer: Viewer;
  private activeIndex: number;
  private window: Window;
  private canvasWidth = 0;
  private canvasHeight = 0;
  private total: number;
  private focusLock: boolean;
  private onChangeIndex: (index: number) => void;
  private getScanUrl: (id: string) => string;

  constructor(params: Params) {
    this.viewer = params.viewer;
    this.total = params.total;
    this.window = params.window;
    this.focusLock = false;
    this.onChangeIndex = params.onChangeIndex;
    this.getScanUrl = params.getScanUrl;
    this.activeIndex = 0;
    this.updateCanvasSize();
    this.registerHandlers();
    this.load({
      items: params.items,
      activeIndex: this.activeIndex,
    });
  }

  public updateTotal(amount: number): this {
    this.total = amount;
    return this;
  }

  public get hasNext(): boolean {
    if (this.viewerItems.length === 0) {
      return true;
    }

    return !!this.viewerItems[this.activeIndex + 1];
  }

  public get hasPrevious(): boolean {
    if (this.viewerItems.length === 0) {
      return true;
    }

    return !!this.viewerItems[this.activeIndex - 1];
  }

  /**
   * Use this method to add new tiles to the beginning or end of the collection
   */
  public async load(options: LoadParams): Promise<void> {
    this.focusLock = true;

    this.viewerItems = options.prepend
      ? [...options.items, ...this.viewerItems]
      : [...this.viewerItems, ...options.items];

    await Promise.all(
      options.items.map((item, index) =>
        this.addImage(item, index + (options.offset || 0), options.prepend)
      )
    );

    setTimeout(() => {
      if (options.activeIndex !== undefined) {
        this.goToIndex(options.activeIndex, true, options.immediately);
      }

      if (options.refreshOverlays) {
        this.updateOverlays();
      }

      this.focusLock = false;
    }, 0);
  }

  public reset(): void {
    this.viewerItems = [];
    this.viewer.clearOverlays();
    this.viewer.world.removeAll();
  }

  /**
   * Adds an image to the world
   * @param transcription
   * @param index The index of the scan in context of the entire inventory. (Also known as pagenumber - 1)
   * @param prepend Whether or not to animate the scan into place
   * @returns
   */
  private addImage(
    transcription: ITranscription,
    index: number,
    prepend?: boolean
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      this.viewer.addTiledImage({
        tileSource: transcription.image,
        index,
        replace: false,
        collectionImmediately: prepend,
        placeholderFillStyle: '#e5ebf1',
        success: () => {
          resolve(index);
        },
        error: () => {
          reject();
        },
      });
    });
  }

  private parseTokenCoords(
    token: IToken
  ): { x: number; y: number; width: number; height: number } | undefined {
    if (token.coords === undefined) {
      return;
    }

    const [leftTopX, leftTopY] = token.coords[0];
    const [rightBottomX, rightBottomY] = token.coords[2];

    return {
      x: Number(leftTopX),
      y: Number(leftTopY),
      width: Number(rightBottomX) - Number(leftTopX),
      height: Number(rightBottomY) - Number(leftTopY),
    };
  }

  /**
   * This methods adds an overlay foreach word in the scan that matches the query
   * It calculates the position based on the position of the scan in the collection
   */
  private addTokenOverlays(item: ITranscription, itemBounds: Rect): void {
    item.queryTokens.forEach((token) => {
      const parsedToken = this.parseTokenCoords(token);

      if (token.coords === undefined || parsedToken === undefined) {
        return;
      }

      const { x, y, width, height } = parsedToken;
      const ratioHeight = itemBounds.height / item.image_height;
      const ratioWidth = itemBounds.width / item.image_width;
      const offsetLeft = itemBounds.x;
      const offsetTop = itemBounds.y;

      const location = new Rect(
        offsetLeft + x * ratioWidth,
        offsetTop + y * ratioHeight,
        width * ratioWidth,
        height * ratioHeight
      );

      const points = token.coords.map(
        ([pointX, pointY]) => `${Number(pointX) - x} ${Number(pointY) - y}`
      );
      const polygon = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'polygon'
      );
      polygon.setAttribute('points', points.join(', '));
      polygon.style.fill = 'rgba(240, 11, 11, 0.2)';

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.appendChild(polygon);
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svg.style.width = '100%';
      svg.style.position = 'absolute';

      const overlayEl = document.createElement('div');
      overlayEl.appendChild(svg);

      this.viewer.addOverlay({
        element: overlayEl,
        location,
        checkResize: true,
      });
    });
  }

  private registerHandlers() {
    let focusHandle = -1;

    const canvasHandler = () => {
      if (focusHandle !== -1) {
        return;
      }
      if (this.focusLock) {
        return;
      }
      focusHandle = this.window.setTimeout(() => {
        focusHandle = -1;
        this.updateFocus();
      }, 100);
    };

    this.viewer.addHandler('canvas-click', canvasHandler);
    this.viewer.addHandler('canvas-double-click', canvasHandler);
    this.viewer.addHandler('canvas-drag-end', canvasHandler);
    this.viewer.addHandler('canvas-key', canvasHandler);
    this.viewer.addHandler('canvas-pinch', canvasHandler);
    this.viewer.addHandler('canvas-scroll', canvasHandler);
    this.viewer.addHandler('animation-finish', () => this.updateOverlays());
  }

  /**
   * This method adds overlays for each scan that is in view
   * This is necessary to keep the amount of html overlay element to a minimum. Because inventories can consist of hundreds of scans and in theory thousands of overlays, the DOM should be kept clean
   */
  private updateOverlays(): void {
    const items = this.getItemsInView();

    this.viewer.clearOverlays();

    items.forEach((index) => {
      const transcription = this.viewerItems[index];
      const currentItem = this.viewer.world.getItemAt(index);

      if (!currentItem) {
        return;
      }

      const itemBounds = currentItem.getBounds();

      this.addTokenOverlays(transcription, itemBounds);
      this.addScanOverlay({
        itemBounds,
        href: this.getScanUrl(transcription.id),
        id: transcription.id,
        isActive: index === this.activeIndex,
      });
    });
  }

  /**
   * @returns Index numbers of scans that are in or around the viewport
   */
  private getItemsInView(): number[] {
    const viewportBounds = this.viewer.viewport.getBounds();
    const itemsInView: number[] = [];
    const threshold = 1000;

    for (let i = 0; i < this.viewer.world.getItemCount(); i += 1) {
      const bounds = this.viewer.world.getItemAt(i).getBounds();
      const lowerLimit =
        bounds.x + bounds.width + threshold > Math.abs(viewportBounds.x);
      const upperLimit = bounds.x < viewportBounds.width + viewportBounds.x;

      if (lowerLimit && upperLimit) {
        itemsInView.push(i);
      }
    }

    return itemsInView;
  }

  updateCanvasSize(): void {
    const canvasSize = this.viewer.canvas.getBoundingClientRect();
    this.canvasWidth = canvasSize.width;
    this.canvasHeight = canvasSize.height;
  }

  public next(): void {
    this.goToIndex(this.activeIndex + 1, false);
  }

  public previous(): void {
    this.goToIndex(this.activeIndex - 1, false);
  }

  public goToIndex(
    activeIndex: number,
    zoom = true,
    immediately?: boolean | undefined
  ): void {
    if (activeIndex > this.total || this.activeIndex < 0) {
      return;
    }

    if (activeIndex >= this.viewerItems.length) {
      return;
    }

    this.updateCanvasSize();

    const itemCount = this.viewer.world.getItemCount();
    const item = this.viewer.world.getItemAt(activeIndex);

    // Sometimes the viewer is not ready with the item.
    if (!item) {
      return;
    }

    const itemBounds = item.getBounds();
    const center = itemBounds.getCenter();

    if (
      activeIndex % 2 === 0 &&
      activeIndex < itemCount &&
      this.canFitSpread()
    ) {
      center.x += itemBounds.width / 2;
    }

    if (zoom) {
      this.zoomToFit(itemBounds, immediately);
    }

    this.setActiveIndex(activeIndex);
    this.viewer.viewport.panTo(center, immediately);
  }

  private setActiveIndex(index: number): void {
    const viewerItem = this.viewerItems[index];

    if (!viewerItem) {
      return;
    }

    this.activeIndex = index;
    this.onChangeIndex(index);
  }

  private updateFocus() {
    const closestItem = this.findItemClosestToViewportCenter();
    this.setActiveIndex(closestItem);
  }

  private canFitSpread(): boolean {
    const e = 1 / (2 * this.canvasWidth);
    const t = 1 / this.canvasHeight / this.viewer.viewport.getAspectRatio();
    return e > t;
  }

  private findItemClosestToViewportCenter() {
    const viewportCenter = this.viewer.viewport.getCenter();
    let bestDiff = Number.MAX_VALUE;
    let closestItem = 0;
    for (let i = 0; i < this.viewer.world.getItemCount(); i += 1) {
      const imageCenter = this.viewer.world
        .getItemAt(i)
        .getBounds()
        .getCenter();
      const diffX = Math.abs(viewportCenter.x - imageCenter.x);
      const diffY = Math.abs(viewportCenter.y - imageCenter.y);
      const diff = diffX + diffY;

      if (diff > bestDiff) {
        break;
      }
      bestDiff = diff;
      closestItem = i;
    }
    return closestItem;
  }

  /**
   * Use this method to make a scan clickable
   * These urls do not work well with Angular, if you wish so, you must add a clickevent outside of this class and handle the clicks as you wish
   */
  private addScanOverlay(options: {
    itemBounds: Rect;
    href: string;
    id: string;
    isActive: boolean;
  }) {
    const element = document.createElement('a');
    element.setAttribute('href', options.href);
    element.setAttribute('title', 'Klik om de transcriptie te bekijken');
    element.setAttribute('class', 'scan-overlay');
    element.setAttribute('aria-label', `Scan ${options.id}`);
    element.dataset.testid = 'viewer-overlay';
    element.dataset.id = options.id;

    if (options.isActive) {
      element.focus();
      element.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    }

    this.viewer.addOverlay({
      element,
      location: options.itemBounds.getTopLeft(),
      placement: Placement.TOP_LEFT,
      width: options.itemBounds.width,
      height: options.itemBounds.height,
      id: options.id,
    });
  }

  private zoomToFit(rect: Rect, immediately?: boolean | undefined) {
    this.viewer.viewport.zoomTo(
      this.getFitZoomLevel(rect),
      undefined,
      immediately
    );
  }

  private getFitZoomLevel(rect: Rect): number {
    return 1 / (rect.height + 20) / this.viewer.viewport.getAspectRatio();
  }
}
