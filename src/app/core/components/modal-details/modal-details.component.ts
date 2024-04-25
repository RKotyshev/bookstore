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
  // public state = {
  //   entityType: 'Entity',
  //   fields: [
  //     'Entity name: default',
  //     'Entity surname: default',
  //   ], 
  // };

  // @ViewChild('headerContainer', { read: ViewContainerRef })
  // private _headerContainer!: ViewContainerRef;

  // @ViewChild('defaultHeader')
  // private _defaultHeader!: TemplateRef<any>;

  // @ViewChild('contentContainer', { read: ViewContainerRef })
  // private _contentContainer!: ViewContainerRef;

  // @ViewChild('defaultContent')
  // private _defaultContent!: TemplateRef<any>;

  // constructor(private _cdr: ChangeDetectorRef) {}

  // public ngAfterViewInit(): void {
  //   this._headerContainer.createEmbeddedView(this._defaultHeader,{
  // state: { entityType: 'Entity' },
  // });
  //   this._cdr.detectChanges();
  // }
}
