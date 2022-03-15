import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includes',
})
export class IncludesPipe implements PipeTransform {
  transform(value: unknown, list: unknown[]): boolean {
    if (!Array.isArray(list)) {
      return false;
    }

    return list.includes(value);
  }
}
