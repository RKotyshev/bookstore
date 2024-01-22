import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullname',
})
export class FullnamePipe implements PipeTransform {

  public transform(firstName: string, secondName: string): string {
    return `${firstName} ${secondName}`;
  }

}
