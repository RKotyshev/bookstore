import { Pipe, PipeTransform } from '@angular/core';

import { IAuthor } from '../interfaces/author';


@Pipe({
  name: 'fullname',
  standalone: true,
})
export class FullnamePipe implements PipeTransform {
  public transform(author: IAuthor): string {
    return `${author.firstName} ${author.secondName}`;
  }
}
