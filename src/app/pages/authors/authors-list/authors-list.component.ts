import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IAuthor } from '../../../core/interfaces/author';


@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrl: './authors-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsListComponent {
  @Input()
  public authorsList!: IAuthor[];
}
