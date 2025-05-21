import { Injectable } from "@angular/core";
import { Todo } from "./todos-list/todos-list.component";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:'root'})

export class TodosService {
   todosSubjest = new BehaviorSubject<Todo[]>([]);
      todos: Todo[] = [];
   
      setTodos(todos: Todo[]): void {
         this.todos = todos;
         this.todosSubjest.next(todos);
      }
   
      editTodo(editedTodo: Todo) {
         this.todosSubjest.next(
            this.todosSubjest.value.map(
               todo => {
                  if (todo.id === editedTodo.id) {
                     return editedTodo}
                  else {
                     return todo}
               }
            )
         )
      }
   
      creatTodo(todo: Todo) {
         const existingUser = this.todosSubjest.value.find(
         (currentElement) => currentElement.userId === todo.userId);

      if (existingUser !== undefined) {
         alert('Еакая задача уже существует')} 
      else {
         this.todosSubjest.next([...this.todosSubjest.value, todo])
         alert('Задача успешно создана')
      }
      }
   
      deleteTodo(id: number) {
         this.todosSubjest.next(
            this.todosSubjest.value.filter(
               item => {
                  if (id === item.id) {
                     return false}
               else {return true}
               }
            )
         )  
      }
}