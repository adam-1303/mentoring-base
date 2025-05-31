
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { DeleteUserDialogComponent } from "../delete-user-dialog/delete-user-dialog.component";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { User } from "../users-list.component";

@Component({
   selector: 'app-user-card',
   standalone: true,
   templateUrl: './user-card.component.html',
   styleUrl: './user-card.component.scss',
   imports: [MatSnackBarModule]
})

export class UserCardComponent {
   
   @Input()
   user!: User;

   @Output()
   deleteUser = new EventEmitter<number>();

   @Output()
   editUser = new EventEmitter<User>();

   readonly snackBar = inject(MatSnackBar)

   readonly dialog = inject(MatDialog);
   
   openDialog(): void {
      const dialogRef = this.dialog.open(EditUserDialogComponent, {
         data: { user: this.user },
      });

      dialogRef.afterClosed().subscribe((editResult: User) => {
         if (editResult) {
            this.editUser.emit(editResult)
            this.snackBar.open('Пользователь обновлен', 'Закрыть', { duration: 3000 })
         }
      });
   }

   onDeleteUser(): void {
      const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
         data: { user: this.user },
      });

      dialogRef.afterClosed().subscribe((deleteResult: boolean) => {
         if (deleteResult) {
            this.deleteUser.emit(this.user.id)
            this.snackBar.open('Пользователь удален', 'Закрыть', { duration: 3000 })
         }
      });
   }
}