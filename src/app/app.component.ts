import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { YellowDirective } from './directives/yellow.directive';

const newPages = [5, 4, 3, 2, 1 ]

const aboutCompanyFn = (text: string) => text;

const aboutCompany = aboutCompanyFn('О компании');

const menuItems = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда']

const upperCaseMenuItems = menuItems.map(
  
  (item: string) => {
      return item.toUpperCase();
      }
)

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, RouterLink,CommonModule,YellowDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  today: Date = new Date();

  title = 'mentoring-first';

  isShowCatalog : boolean = true;

  readonly headerItem1 = 'Главная';

  readonly headerItem2 = 'О компании';

  readonly header2Item4: string = upperCaseMenuItems[0];

  readonly aboutCompany : string = aboutCompany;

  menuItems : string[] = upperCaseMenuItems;

  readonly headerItem3 = 'Каталог';

  readonly header2Item = 'Каталог';

  readonly header2Item1 = 'Стройматериалы';

  readonly header2Item2 = 'Инструменты';

  readonly header2Item3 = 'Электрика';

  readonly header2item4 = 'Интерьер и Одежда';

  isShowImg : boolean = true;

  isUppersCase = true;
  
  newPages: number[] = newPages;

  changeMenuText() {
  this.menuItems = upperCaseMenuItems.map(
  item => this.isUppersCase ? item.toLowerCase() : item.toUpperCase()
  )
  this.isUppersCase = !this.isUppersCase
  }
}
