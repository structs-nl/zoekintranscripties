import { Pipe, PipeTransform } from '@angular/core';
import { RicoRecord, RicoRecordSet } from '../models/document';
import {
  IInventoryHierarchy,
  IRecord,
} from '../services/transcription.service';

@Pipe({
  name: 'rico',
})
export class RicoPipe implements PipeTransform {
  private parseDate(value?: string): number[] {
    const range: number[] = [];

    if (!value) {
      return [];
    }

    const parts = value.split('/');

    if (parts.length === 1) {
      const y = parts[0].slice(0, 4);

      if (!range.includes(Number(y))) {
        range.push(Number(y));
      }
    }

    if (parts.length === 2) {
      const y1 = Number(parts[0].slice(0, 4));
      const y2 = Number(parts[1].slice(0, 4));

      if (!range.includes(y1)) {
        range.push(y1);
      }

      if (!range.includes(y2)) {
        range.push(y2);
      }
    }

    return range;
  }

  private parseRecordSet(recordset: RicoRecordSet): IInventoryHierarchy {
    const titles: IRecord[] = [];
    const ids: string[] = [];
    let currentSet: RicoRecordSet | undefined = recordset;
    let date;
    let record: RicoRecord | undefined;

    do {
      const rs: RicoRecordSet | undefined = currentSet['rico:RecordSet'];

      if (rs?.['rico:title']?.trim()) {
        titles.push({
          title: rs['rico:title'],
          id: rs['rico:identifier'],
          date: rs['rico:date'],
          description: rs['html:p'],
        });
      }

      if (rs?.['rico:identifier']) {
        ids.push(rs['rico:identifier']);
      }

      if (rs?.['rico:date'] && date === undefined) {
        date = rs['rico:date'];
      }

      if (rs?.['rico:includedIn']) {
        currentSet = rs['rico:includedIn'];
      }

      if (rs?.['rico:isDescribedBy']) {
        record = rs['rico:isDescribedBy']['rico:Record'];
        currentSet = undefined;
      }
    } while (currentSet !== undefined);

    titles.reverse();
    ids.reverse();

    return {
      archives: titles,
      date: this.parseDate(date),
      access: record?.['rico:identifier'],
      archive: `${record?.['rico:publishedBy']} - ${record?.['rico:managedBy']}`,
      inventory: ids[ids.length - 1],
      title: titles[titles.length - 1].title,
    };
  }

  transform(rico: RicoRecordSet): IInventoryHierarchy[] {
    const sets = rico['rico:includes']?.map((recordset) =>
      this.parseRecordSet(recordset)
    );

    return sets || [];
  }
}
