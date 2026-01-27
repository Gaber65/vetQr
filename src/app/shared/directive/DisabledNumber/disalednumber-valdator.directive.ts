import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[type="number"]'
})
export class DisalednumberValdatorDirective {

  constructor() { }
   @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    event.preventDefault();
  }

}
