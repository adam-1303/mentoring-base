import { Component, Inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from "@angular/material/dialog";

@Component({
   selector: 'app-user-delete-dialog',
   templateUrl: './delete-user-dialog.component.html',
   styleUrl: './delete-user-dialog.component.scss',
   standalone: true,
   imports: [ReactiveFormsModule,MatCardModule,MatDialogContent,MatDialogActions,MatButtonModule]
})

export class DeleteUserDialogComponent {

   constructor(
      public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { userName: string }
   ) {}

   onConfirm(): void {
      this.dialogRef.close(true);
   }

   onCancel(): void {
      this.dialogRef.close(false);
   }
}