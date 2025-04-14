import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosApiService } from "../todos-api.service";
import { TodosService } from "../todos.service";
import { CreateTodosFormComponent } from "../create-todos-form/create-todos-form.component";

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
      readonly todosService = inject(TodosService)

      constructor() {
      this.todosApiService.getTodos().subscribe(
            (response: any) => {
                  this.todosService.setTodos(response)
            }
      )
      }
      deleteTodo(id: number) {
            this.todosService.deleteTodo(id)
      }

      editTodo(todo: any) {
            this.todosService.editTodo(todo)
      }

      public createTodos(formItem: Todo) {
      this.todosService.creatTodo({
            id: new Date().getTime(),
            userId: formItem.userId,
            title: formItem.title,
            completed: formItem.completed,
            });

            console.log('ДАННЫЕ ФОРМЫ:', event);
      }
}