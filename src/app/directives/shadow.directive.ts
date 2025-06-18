import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appShadow]',
  standalone: true
})

export class ShadowDirective {
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') 
  enter() {
    this.setShadow('0 4px 12px rgba(0, 0, 0.3)');
  }
  
  @HostListener('mouseleave') 
  leave() {
    this.setShadow('none')
  }

  private setShadow(shadow: string) {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', shadow);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'box-shadow 0.3s ease');
  }
}