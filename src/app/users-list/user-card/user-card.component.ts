
import { Component, EventEmitter, inject, Input, Output} from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { DeleteUserDialogComponent } from "../delete-user-dialog/delete-user-dialog.component";


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
         data: { user: this.user },
      });

      dialogRef.afterClosed().subscribe((editResult) => {
         if (editResult) {
            this.editUser.emit(editResult)
         }
      });
   }

   onDeleteUser(): void {
      const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
         data: { user: this.user },
      });

      dialogRef.afterClosed().subscribe((editResuit) => {
         if (editResuit) {
            this.deleteUser.emit(this.user.id)
         }
      });
   }
}