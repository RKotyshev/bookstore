import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'fileTypes',
  standalone: true,
})
export class FileTypesPipe implements PipeTransform {
  public transform(typesArray: string[]): string {
    const correctTypes = typesArray.map((type: string) => {
      const startIndex = type.indexOf('/') + 1;
      
      return `.${type.slice(startIndex)}`;
    });

    return correctTypes.join(', ');
  }
}
