import { Pipe, PipeTransform } from '@angular/core';

import { IAuthor } from '../../../core/interfaces/author';


@Pipe({
  name: 'fullname',
  standalone: true,
})
export class FullnamePipe implements PipeTransform {

  public transform(author: IAuthor): string {
    return `${author.first_name} ${author.second_name}`;
  }

}
