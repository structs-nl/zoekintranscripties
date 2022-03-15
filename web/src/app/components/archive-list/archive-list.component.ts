import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  ITreeOptions,
  ITreeState,
  TreeComponent,
  TreeNode,
  TREE_ACTIONS,
} from '@circlon/angular-tree-component';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import {
  IBucket,
  IQueryParams,
  TranscriptionService,
} from 'src/app/services/transcription.service';

@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.css'],
})
export class ArchiveListComponent implements OnDestroy, OnChanges {
  hasFocus = false;
  search: FormControl = new FormControl();
  searchResult: IBucket[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  isSearchMode = false;
  state: ITreeState = {};
  options: ITreeOptions = {
    idField: 'value',
    displayField: 'label',
    useTriState: true,
    getChildren: async (node: TreeNode) => {
      const children = await this.getChildren(node.id);

      if (children === null) {
        node.collapse();
        // TODO: hide collapse icon
      }

      return children;
    },
    actionMapping: {
      mouse: {
        click: TREE_ACTIONS.TOGGLE_EXPANDED,
      },
      keys: null,
    },
  };

  @ViewChild('tree') tree?: TreeComponent;
  @Input() isHierarchy = false;
  @Input() selectedArchives: string[] = [];
  @Input() archives: IBucket[] = [];
  @Input() pageSize = 20;
  @Input() label?: string;
  @Input() emptyText? = 'Geen resultaten';
  @Input() params?: IQueryParams;
  @Input() showCount = false;
  @Input() cursor?: string;
  @Input() type: 'archive' | 'description' = 'archive';
  @Output() onChange: EventEmitter<string[]> = new EventEmitter();

  constructor(private client: TranscriptionService) {
    this.search.valueChanges
      .pipe(debounceTime(200), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.onValueChange(value);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedArchives.length === 0) {
      this.state = {};
    }

    if (
      changes.selectedArchives &&
      JSON.stringify(changes.selectedArchives.currentValue) !==
        JSON.stringify(changes.selectedArchives.previousValue)
    ) {
      this.updateState(this.selectedArchives);
    }
  }

  getParentsOfArchive(archive: string): string[] {
    const parents: string[] = [];
    const parts = archive.split('|');

    parts.forEach((part, index) => {
      parents.push(parts.slice(0, index).join('|'));
    });

    // NOTE: start at index 2 because the first values are empty.
    return parents.slice(2);
  }

  onSubmitQuery(event: Event): void {
    event.preventDefault();
    this.onValueChange(this.search.value);
  }

  initTree(): void {
    if (this.tree === undefined) {
      return;
    }

    setTimeout(() => {
      this.expandParents(this.selectedArchives);
    }, 400);
  }

  async expandParents(parents: string[]): Promise<void> {
    const uniqueParents = new Set<string>();

    parents.forEach((archive) => {
      const parents = this.getParentsOfArchive(archive);

      parents.forEach((parent) => uniqueParents.add(parent));
    });

    for (const parent of [...uniqueParents]) {
      await this.onLoadChildren(parent);
    }
  }

  onLoadChildren(parent: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const node = this.tree?.treeModel.getNodeById(parent) as TreeNode;
        if (node) {
          await node.loadNodeChildren();
          node.setIsExpanded(true);

          if (this.selectedArchives.includes(parent)) {
            node.isSelected();
          }

          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  onClickHierarchy(event: Event, node: TreeNode): void {
    event.preventDefault();
    node.toggleSelected();

    this.onChange.emit(this.walkBuckets(this.archives));
  }

  onClickLabel(event: Event, node: TreeNode): void {
    event.preventDefault();
    event.stopPropagation();
    node.mouseAction('click', event);
  }

  updateState(selectedArchives: string[]): void {
    this.state = {
      ...this.state,
      selectedLeafNodeIds: selectedArchives.reduce(
        (acc: Record<string, boolean>, archive: string) => ({
          ...acc,
          [archive]: true,
        }),
        {}
      ),
    };
  }

  normalizeSelectedArchives(): string[] {
    const selectedLeafNodeIds: string[] = [];

    for (const archive in this.state.selectedLeafNodeIds) {
      if (this.state.selectedLeafNodeIds[archive] === true) {
        selectedLeafNodeIds.push(archive);
      }
    }

    return selectedLeafNodeIds;
  }

  walkBuckets(buckets: IBucket[]): string[] {
    const selectedArchives = new Set<string>();

    buckets.forEach((bucket) => {
      const node = this.tree?.treeModel.getNodeById(bucket.value);

      if (!node) {
        return;
      }

      if (node.isSelected && !node.isPartiallySelected) {
        selectedArchives.add(bucket.value);
      }

      if (
        !node.isAllSelected &&
        bucket.children &&
        bucket.children.length > 0
      ) {
        this.walkBuckets(bucket.children).forEach((archive) =>
          selectedArchives.add(archive)
        );
      }
    });

    return [...selectedArchives];
  }

  async onValueChange(query: string): Promise<void> {
    if (query.length === 0 || query === '') {
      this.searchResult = [];
      this.isSearchMode = false;

      return;
    }

    this.searchResult = [];
    this.isSearchMode = true;

    const fetchMethod =
      this.type === 'archive'
        ? this.client.archives({ query })
        : this.client.descriptions({ query });

    this.searchResult = await fetchMethod.toPromise();
  }

  async getChildren(id: string): Promise<IBucket[] | null> {
    if (this.params === undefined) {
      return [];
    }

    const searchResponse = await this.client
      .search({
        ...this.params,
        limit: 0,
        offset: 0,
        descriptionPrefix: id,
      })
      .toPromise();

    const buckets = searchResponse.aggregations.descriptions.buckets;

    if (buckets.length === 0) {
      return null;
    }

    return buckets;
  }

  onFocus(): void {
    this.hasFocus = true;
  }

  onBlur(): void {
    this.hasFocus = false;
  }

  onReset(): void {
    this.expandParents(this.selectedArchives);
    this.search.setValue('');
  }

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    const archives = target.checked
      ? [...this.selectedArchives, target.name]
      : this.selectedArchives.filter((name) => name !== target.name);

    this.onChange.emit(archives);
  }
}
