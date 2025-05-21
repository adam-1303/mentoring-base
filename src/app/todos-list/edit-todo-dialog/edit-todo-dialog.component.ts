import { Component, inject, } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { completedValidator } from "../../create-todos-form/create-todos-form.component";
import { MAT_DIALOG_DATA, MatDialogClose } from "@angular/material/dialog";
import { Todo } from "../todos-list.component";
import { MatError, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import {MatCardModule} from '@angular/material/card';

@Component({
   selector: 'app-edit-todo-dialog',
   templateUrl: './edit-todo-dialog.component.html',
   styleUrl: './edit-todo-dialog.component.scss',
   standalone: true,
   imports: [ReactiveFormsModule,MatDialogClose,MatError,MatIconModule,MatFormFieldModule,MatInputModule,MatCardModule]
})

export class EditTodoDialogComponent {
   readonly data = inject<{todo: Todo}>(MAT_DIALOG_DATA)
      
      public form = new FormGroup({
            "userId": new FormControl(this.data.todo.userId, [Validators.required]),
            "title": new FormControl(this.data.todo.title, [Validators.required]),
            "completed": new FormControl(this.data.todo.completed ? 'да' : 'нет', [Validators.required, completedValidator()]),
      });
   
      private getCompletedValue(): boolean {
         const value = this.form.get('completed')?.value!.trim().toLowerCase();
         if (value === 'да')
            return true;
         else return false;
      }
   
   get todoWithUpdatedFields() {
      return {
         ...this.form.value,
         id: this.data.todo.id,
      }
   }
}