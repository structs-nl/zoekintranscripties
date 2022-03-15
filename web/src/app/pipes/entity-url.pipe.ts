import { Inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entityUrl',
})
export class EntityUrlPipe implements PipeTransform {
  constructor(@Inject('apiBaseUrl') private apiBaseUrl: string) {}

  transform(id: string): string {
    return `${this.apiBaseUrl}/entity?id=${id}`;
  }
}
