
import { Component, EventEmitter, inject, Input, Output} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EditTodoDialogComponent } from "../edit-todo-dialog/edit-todo-dialog.component";
import { Todo } from "../todos-list.component";
import { TruncateCharactersPipe } from "../../pipes/truncatecharacters.pipe";
@Component({
   selector: 'app-todo-card',
   standalone: true,
   templateUrl: './todo-card.component.html',
   styleUrls: ['./todo-card.component.scss'],
   imports: [TruncateCharactersPipe]
})

export class TodoCardComponent {
   @Input()
   todo!: Todo;

   @Output()
   deleteTodo = new EventEmitter<number>();

   @Output()
   editTodo = new EventEmitter<Todo>();

   readonly dialogTodo = inject(MatDialog);

   openTodo(): void {
      const dialogRef = this.dialogTodo.open( EditTodoDialogComponent, {
         data: { todo: this.todo },
      });

      dialogRef.afterClosed().subscribe((editResultTodo: Todo) => {
         if (editResultTodo) {
            this.editTodo.emit(editResultTodo)
         }
      });
   }

   onDeleteTodo(todoId: number) {
      this.deleteTodo.emit(todoId);
   }
}