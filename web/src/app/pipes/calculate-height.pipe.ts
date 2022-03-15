import { Pipe, PipeTransform } from '@angular/core';
import { InputRangeBucket } from '../components/range-slider/range-slider.component';

@Pipe({
  name: 'calculateHeight',
})
export class CalculateHeightPipe implements PipeTransform {
  transform(value: InputRangeBucket, buckets: InputRangeBucket[]): number {
    if (!buckets || buckets.length === 0) {
      return 0;
    }

    const containerHeight = 100;
    const values = buckets.map((bucket) => bucket.count);
    return (value.count / Math.max(...values)) * containerHeight;
  }
}
