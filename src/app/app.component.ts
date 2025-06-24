import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { YellowDirective } from './directives/yellow.directive';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from './auth/auth.component';
import { UserService } from './user.service';

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
  imports: [RouterOutlet, NgIf, NgFor, RouterLink, CommonModule, YellowDirective,AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly dialog = inject(MatDialog);
  public readonly userService = inject(UserService);

  today: Date = new Date();

  title = 'mentoring-first';

  isShowCatalog: boolean = true;

  readonly headerItem1 = 'Главная';

  readonly headerItem2 = 'О компании';

  readonly header2Item4: string = upperCaseMenuItems[0];

  readonly aboutCompany: string = aboutCompany;

  menuItems: string[] = upperCaseMenuItems;

  readonly headerItem3 = 'Каталог';

  readonly header2Item = 'Каталог';

  readonly header2Item1 = 'Стройматериалы';

  readonly header2Item2 = 'Инструменты';

  readonly header2Item3 = 'Электрика';

  readonly header2item4 = 'Интерьер и Одежда';

  isShowImg: boolean = true;

  isUppersCase = true;
  
  newPages: number[] = newPages;

  changeMenuText() {
    this.menuItems = upperCaseMenuItems.map(
      item => this.isUppersCase ? item.toLowerCase() : item.toUpperCase()
    )
    this.isUppersCase = !this.isUppersCase;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: "500px",
      height: "300px"
    });
  
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'admin') {
        this.userService.loginAsAdmin()
      } else if (result === 'user') {
        this.userService.loginAsUser()
      } else return undefined;
    }
    );
  }

  public logout() {
    if (confirm('Вы точно хотите выйти?')) {
      return this.userService.logout();
    }
    else return false;
  } 
}
