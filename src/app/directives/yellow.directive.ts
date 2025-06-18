import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[yellow]',
  standalone: true
})

export class YellowDirective {
  private defaultColor = '';
  private hoverColor = 'yellow';

  @HostBinding('style.backgroundColor') backgroundColor!: string;

  @HostListener('mouseenter')
  enter() {
    this.backgroundColor = this.hoverColor;
  }

  @HostListener('mouseleave')
  leave() {
    this.backgroundColor = this.defaultColor;
  }
}
