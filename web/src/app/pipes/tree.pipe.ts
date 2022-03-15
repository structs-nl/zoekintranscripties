import { Pipe, PipeTransform } from '@angular/core';
import {
  IInventoryHierarchy,
  IRecord,
} from '../services/transcription.service';

export interface TreeNode {
  value: IRecord;
  description?: string;
  children: TreeNode[];
}

@Pipe({
  name: 'tree',
})
export class TreePipe implements PipeTransform {
  transform(archives: IInventoryHierarchy[]): TreeNode {
    const walker = (nodes: TreeNode[], children?: TreeNode[]): TreeNode => {
      return nodes
        .reverse()
        .slice(1)
        .reduce(
          (base: TreeNode, archive: TreeNode) => {
            return {
              ...archive,
              children: [base],
            };
          },
          { value: nodes[0].value, children: children || [] }
        );
    };

    const hierarchies = archives.map((value) => value.archives);

    const splitIndex = hierarchies[0].reduce(
      (acc: number, value: IRecord, index: number) => {
        const isEqual = hierarchies
          .map((h) => h[index])
          .every((hi) => hi === hierarchies[0][index]);

        return isEqual ? index + 1 : acc;
      },
      0
    );

    const difference: TreeNode[] = [];

    hierarchies.forEach((hierarchy) => {
      const archives = hierarchy.slice(splitIndex).map((value) => ({
        value,
        children: [],
      }));

      if (archives.length > 0) {
        difference.push(walker(archives));
      }
    });

    const baseNodes = hierarchies[0]
      .slice(0, splitIndex === 0 ? 1 : splitIndex)
      .map((value) => ({
        value,
        children: [],
      }));

    const base = walker(baseNodes, difference);

    return base;
  }
}
