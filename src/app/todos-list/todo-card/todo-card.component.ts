import { NgFor } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EditTodoDialogComponent } from "../edit-todo-dialog/edit-todo-dialog.component";


@Component({
   selector: 'app-todo-card',
   standalone: true,
   templateUrl: './todo-card.component.html',
   styleUrl: './todo-card.component.scss',
   imports: [NgFor]
})

export class TodoCardComponent {
   @Input()
   todo: any

   @Output()
   deleteTodo = new EventEmitter();

   @Output()
   editTodo = new EventEmitter();

   readonly Conver = inject(MatDialog)

   openTodo(): void {
      const dialogRef = this.Conver.open( EditTodoDialogComponent, {
         data: { todo: this.todo },
      });

      dialogRef.afterClosed().subscribe((editResultTodo) => {
         if (editResultTodo) {
            this.editTodo.emit(editResultTodo)
         }
      });
   }

   onDeleteTodo(todoId: number) {
      this.deleteTodo.emit(todoId);
   }
}