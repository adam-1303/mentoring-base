import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosApiService } from "../todos-api.service";
import { CreateTodosFormComponent } from "../create-todos-form/create-todos-form.component";
import { Store } from "@ngrx/store";
import { selectTodos } from "./todo-store/todos.selectors";
import { TodosActions } from "./todo-store/todos.actions";

export interface Todo {
      "userId": number,
      "id": number,
      "title": string,
      "completed": boolean
}

@Component({
      selector: 'app-todos-list',
      templateUrl: './todos-list.component.html',
      styleUrl: './todos-list.component.scss',
      standalone: true,
      imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodosFormComponent],
      changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent{

      readonly todosApiService = inject(TodosApiService);
      private readonly store = inject(Store);
      public readonly todos$ = this.store.select(selectTodos)

      constructor() {
            this.todosApiService.getTodos().subscribe((response: Todo[]) => {
                  this.store.dispatch(TodosActions.set({ todos: response }));
            });
      }
      deleteTodo(id: number) {
            this.store.dispatch(TodosActions.delete({ id }));
      }

      editTodo(todo: Todo) {
            this.store.dispatch(TodosActions.edit({ todo }));
      }

      public createTodos(formItem: Todo) {
            this.store.dispatch(
                  TodosActions.create({
                        todo: {
                              id: new Date().getTime(),
                              userId: formItem.userId,
                              title: formItem.title,
                              completed: formItem.completed
                        },
                  })
            );
      };
};