import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includesMany',
})
export class IncludesManyPipe implements PipeTransform {
  transform(values: unknown[], list: unknown[]): boolean {
    if (!Array.isArray(list)) {
      return false;
    }

    return values.every((value) => list.includes(value));
  }
}
