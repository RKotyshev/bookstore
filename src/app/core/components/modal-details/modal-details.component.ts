import { NgFor, NgTemplateOutlet } from '@angular/common';
import { 
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-modal-details',
  standalone: true,
  imports: [
    NgFor,
    MatButtonModule,
    NgTemplateOutlet,
  ],
  templateUrl: './modal-details.component.html',
  styleUrl: './modal-details.component.scss',
})
export class ModalDetailsComponent {
  @Input()
  public fields: string[] = [];

  @Output()
  public close = new EventEmitter();

  @ContentChild('headerTemplate')
  public headerTemplate!: TemplateRef<unknown>;

  @ContentChild('fieldTemplate')
  public fieldTemplate!: TemplateRef<unknown>;

  constructor() {}

  public onClose(): void {
    this.close.emit();
  }
}
