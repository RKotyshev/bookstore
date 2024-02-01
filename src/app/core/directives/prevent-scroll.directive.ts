import { Directive, HostListener } from '@angular/core';
import { MobileMenuService } from '../services/mobile-menu.service';

@Directive({
  selector: '[appPreventScroll]',
})
export class PreventScrollDirective {

  constructor(private _menuService: MobileMenuService) { }
  
  @HostListener('wheel', ['$event']) public preventScroll(event: WheelEvent) {
    if(this._menuService.getMenuStatus()) {
      event.preventDefault();
    }
  }

}
