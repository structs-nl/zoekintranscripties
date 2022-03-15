import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import { IRegion, IToken } from 'src/app/services/transcription.service';

const fillColorMap = {
  transparent: 'transparent',
  token: 'rgba(240, 11, 11, 0.2)',
  region: 'transparent',
};

/**
 * The document viewer shows a single scans and shows and keeps track of words on mouse over
 * - Caution: for serverside rendering it is important only to load the osd packages in the client
 * - Also caution: OSD doesn't seem to play well with TypeScript. Hence the 'any' type definitions.
 */
@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css'],
})
export class DocumentViewerComponent implements OnInit, OnChanges {
  viewer?: any;
  rect?: any;
  mouseTracker?: any;

  canvasHeight?: number;
  isBrowser = false;
  activeTokenOverlayEl?: HTMLDivElement;
  activeRegionOverlayEl: HTMLDivElement[] = [];
  queryTokenElements: HTMLDivElement[] = [];

  @Input() src = '';
  @Input() activeToken?: IToken;
  @Input() activeRegion?: IRegion;
  @Input() queryTokens: IToken[] | null = [];
  @Input() originalWidth?: number;
  @Input() originalHeight?: number;
  @Input() regions: IRegion[] = [];

  // NOTE: this property makes sure changes are detected in the parent component. It is used for calculating the height of the canvas
  @Input() activeViews: string[] = [];

  @Output() changeActiveToken: EventEmitter<
    IToken | undefined
  > = new EventEmitter<IToken | undefined>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private el: ElementRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.calculateCanvasDimensions();
  }

  calculateCanvasDimensions(): void {
    if (!this.originalWidth || !this.originalHeight) {
      return;
    }

    this.canvasHeight =
      this.originalHeight *
      (this.el.nativeElement.offsetWidth / this.originalWidth);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      import('openseadragon').then((module) => {
        this.rect = module.Rect;
        this.mouseTracker = module.MouseTracker;
        this.initViewer(module);
      });

      this.calculateCanvasDimensions();
    }
  }

  createTokenOverlays(): void {
    this.regions.forEach((region) => {
      region.lines.forEach((line) => {
        line.forEach((token) => {
          this.createTokenOverlay(token, 'transparent', 20);
        });
      });
    });
  }

  initViewer(osd: any): void {
    osd.setString('Tooltips.Home', 'Passend in venster');
    osd.setString('Tooltips.ZoomOut', 'Uitzoomen');
    osd.setString('Tooltips.ZoomIn', 'Inzoomen');

    this.viewer = new osd.Viewer({
      prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
      id: 'document-viewer',
      tileSources: this.src,
      homeButton: 'document-zoom-home',
      zoomInButton: 'document-zoom-in',
      zoomOutButton: 'document-zoom-out',
      rotateLeftButton: 'document-rotate-left',
      rotateRightButton: 'document-rotate-right',
      showRotationControl: true,
      autoResize: true,
    }).setControlsEnabled(false);

    this.createQueryOverlays();
    this.createTokenOverlays();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.viewer) {
      return;
    }

    this.calculateCanvasDimensions();

    if (changes.src && changes.src.previousValue !== changes.src.currentValue) {
      this.viewer.open(this.src);
      this.viewer.clearOverlays();
      this.createTokenOverlays();
    }

    if (
      changes.queryTokens &&
      changes.queryTokens.currentValue !== changes.queryTokens.previousValue
    ) {
      this.queryTokenElements.forEach((el) => this.viewer.removeOverlay(el));
      this.createQueryOverlays();
    }

    if (this.activeToken) {
      this.activeTokenOverlayEl = this.createTokenOverlay(
        this.activeToken,
        'token'
      );
    }

    if (!this.activeToken && this.activeTokenOverlayEl) {
      this.viewer.removeOverlay(this.activeTokenOverlayEl);
    }

    if (this.activeRegion) {
      const el = this.createTokenOverlay(this.activeRegion, 'region');

      if (el) {
        this.activeRegionOverlayEl.push(el);
      }
    }

    if (!this.activeRegion && this.activeRegionOverlayEl) {
      this.activeRegionOverlayEl.forEach((el) => this.viewer.removeOverlay(el));
    }
  }

  createQueryOverlays(): void {
    this.queryTokens?.forEach((token) => {
      const el = this.createTokenOverlay(token, 'token');
      if (el) {
        this.queryTokenElements.push(el);
      }
    });
  }

  parseCoords(
    positions: string[][]
  ): { x: number; y: number; width: number; height: number } {
    const coords = positions.map((pos) => ({
      x: Number(pos[0]),
      y: Number(pos[1]),
    }));

    return {
      x: coords[0].x,
      y: coords[0].y,
      width: coords[2].x - coords[0].x,
      height: coords[2].y - coords[0].y,
    };
  }

  createTokenOverlay(
    token: IToken | IRegion,
    type: 'region' | 'token' | 'transparent',
    zIndex = 10
  ): HTMLDivElement | undefined {
    if (
      !this.viewer ||
      !this.originalHeight ||
      !this.originalWidth ||
      !this.rect ||
      !token.coords
    ) {
      return;
    }

    const ratio = this.originalHeight / this.originalWidth;
    const { x, y, width, height } = this.parseCoords(token.coords);

    const location = new this.rect(
      x / this.originalWidth,
      (y / this.originalHeight) * ratio,
      width / this.originalWidth,
      (height / this.originalHeight) * ratio
    );

    const points = token.coords.map(
      ([pointX, pointY]) => `${Number(pointX) - x} ${Number(pointY) - y}`
    );
    const polygon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polygon'
    );
    polygon.setAttribute('points', points.join(', '));
    polygon.style.fill = fillColorMap[type];

    if (type === 'region') {
      polygon.style.stroke = 'var(--primary-color)';
      polygon.style.strokeWidth = '20px';
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.appendChild(polygon);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.width = '100%';
    svg.style.position = 'absolute';

    const overlayEl = document.createElement('div');
    overlayEl.appendChild(svg);
    overlayEl.style.zIndex = String(zIndex);
    overlayEl.style.position = 'relative';

    if (type !== 'region') {
      new this.mouseTracker({
        element: overlayEl,
        stopDelay: 100,
        enterHandler: () => {
          this.changeActiveToken.emit(token as IToken);
        },
        exitHandler: () => {
          this.changeActiveToken.emit(undefined);
        },
      });
    }

    this.viewer.addOverlay({
      element: overlayEl,
      location,
      checkResize: true,
    });

    return overlayEl;
  }
}
