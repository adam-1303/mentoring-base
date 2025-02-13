import { NgFor } from "@angular/common";
import { Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
selector: 'app-user-card',
standalone: true,
templateUrl: './user-card.component.html',
styleUrl: './user-card.component.scss',
imports: [NgFor]
})

export class UserCardComponent {
   @Input()
   user: any

   @Output()
   deleteUser = new EventEmitter()

   onDeleteUser(userId: number) {
      this.deleteUser.emit(userId)
   }
}