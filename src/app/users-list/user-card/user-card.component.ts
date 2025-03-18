import { NgFor } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output} from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";

@Component({
selector: 'app-user-card',
standalone: true,
templateUrl: './user-card.component.html',
styleUrl: './user-card.component.scss',
})

export class UserCardComponent {
   @Input()
   user: any

   @Output()
   deleteUser = new EventEmitter();

   @Output()
   editUser = new EventEmitter();

   readonly dialog = inject(MatDialog);
   

   openDialog(): void {
      const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: {user: this.user},
   });

   dialogRef.afterClosed().subscribe((editResult) => {
      console.log('MODAL',editResult);
      this.editUser.emit(editResult) 
   });
}

   onDeleteUser(userId: number) {
      this.deleteUser.emit(userId)
   }
}