import { Component, Input } from '@angular/core';
import { TreeNode } from '../../pipes/tree.pipe';

@Component({
  selector: 'app-hierarchy-node',
  templateUrl: './hierarchy-node.component.html',
  styleUrls: ['./hierarchy-node.component.css'],
})
export class HierarchyNodeComponent {
  @Input() tree?: TreeNode;
  @Input() isTopLevel = false;
}
