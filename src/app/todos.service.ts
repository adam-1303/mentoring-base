import { Injectable } from "@angular/core";
import { Todo } from "./todos-list/todos-list.component";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn:'root'})

export class TodosService {
   todosSubjest = new BehaviorSubject<Todo[]>([]);
   todos$: Observable<Todo[]> = this.todosSubjest.asObservable();
   
   setTodos(todos: Todo[]): void {
      this.todosSubjest.next(todos);
   }
   
   editTodo(editedTodo: Todo) {
      this.todosSubjest.next(
         this.todosSubjest.value.map(
            (todo: Todo) => todo.id === editedTodo.id ? editedTodo : todo
         )
      )
   }
   
   creatTodo(todo: Todo) {
      const existingTodo: Todo | undefined = this.todosSubjest.value.find(
         (currentElement: Todo) => currentElement.userId === todo.userId
      );

      if (existingTodo !== undefined) {
         alert('Такая задача уже существует');
      } else {
         this.todosSubjest.next([...this.todosSubjest.value, todo]);
         alert('Задача успешно создана');
      }
   }
   
   deleteTodo(id: number): void {
      const updatedTodos: Todo[] = this.todosSubjest.value.filter((todo: Todo) => todo.id !== id);
      this.todosSubjest.next(updatedTodos);
   }
}