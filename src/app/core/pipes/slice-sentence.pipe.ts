import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'sliceSentence',
  standalone: true,
})
export class SliceSentencePipe implements PipeTransform {

  public transform(value: string, charCount: number = 20): string {
    return value.length >= charCount ? `${value.slice(0, charCount)}...` : value;
  }

}
