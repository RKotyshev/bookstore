import { 
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output } from '@angular/core';


@Directive({
  selector: '[appCloseMenu]',
})
export class CloseMenuDirective {
  @Input() public appCloseMenu!: boolean;
  @Output() public appCloseMenuChange = new EventEmitter();
  
  constructor() {
  }

  @HostListener('click') public onClick() {
    this.appCloseMenuChange.emit(!this.appCloseMenu);
  }


}
