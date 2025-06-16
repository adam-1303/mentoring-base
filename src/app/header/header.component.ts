

const aboutCompanyFn = (text: string) => text;

const aboutCompany = aboutCompanyFn('О компании');


export class HeaderComponent {

   isShowCatalog : boolean = true;

   readonly headerItem1 = 'Главная'

   readonly headerItem2 = 'О компании'

   readonly aboutCompany : string = aboutCompany;

   readonly headerItem3 = 'Каталог'

   readonly header2Item = 'Каталог'

   readonly header2Item1 = 'Стройматериалы'

   readonly header2Item2 = 'Инструменты'

   readonly header2Item3 = 'Электрика'

   readonly header2item4 = 'Интерьер и Одежда'
}
