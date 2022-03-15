import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, terms: string[]): string {
    if (!terms || terms.length === 0) {
      return value;
    }

    const regex = new RegExp(terms.join('|'), 'gi');
    const match = value.match(regex);

    if (!match) {
      return value;
    }

    return value.replace(regex, `<span class='highlight'>${match[0]}</span>`);
  }
}
