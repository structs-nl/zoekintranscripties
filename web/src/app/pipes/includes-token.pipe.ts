import { Pipe, PipeTransform } from '@angular/core';
import { IToken } from '../services/transcription.service';

@Pipe({
  name: 'includesToken',
})
export class IncludesTokenPipe implements PipeTransform {
  transform(value: IToken, list: IToken[]): boolean {
    if (!Array.isArray(list)) {
      return false;
    }

    return list.some(
      (token) => token.original.toLowerCase() === value.original.toLowerCase()
    );
  }
}
