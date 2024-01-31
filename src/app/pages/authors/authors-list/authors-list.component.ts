import { Component, Input } from '@angular/core';

import { IAuthor } from '../../../core/interfaces/author';
// import { FullnamePipe } from '../../../shared/shared-pipes/fullname/fullname.pipe';


@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrl: './authors-list.component.scss',
})
export class AuthorsListComponent {
  @Input() public authorsList!: IAuthor[];
}
