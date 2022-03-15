import { Pipe, PipeTransform } from '@angular/core';
import deepEqual from 'fast-deep-equal';

@Pipe({
  name: 'deepEqual',
})
export class DeepEqualPipe implements PipeTransform {
  transform(value: unknown, to: unknown): unknown {
    return deepEqual(value, to);
  }
}
