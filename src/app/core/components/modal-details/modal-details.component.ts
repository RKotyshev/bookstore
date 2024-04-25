import { NgFor, NgTemplateOutlet } from '@angular/common';
import { 
  Component,
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
  public headerTemplate!: TemplateRef<unknown>;

  @Input()
  public fieldTemplate!: TemplateRef<unknown>;

  @Input()
  public fields: string[] = [];

  @Output()
  public close = new EventEmitter();

  constructor() {}

  public onClose(): void {
    this.close.emit();
  }
}
