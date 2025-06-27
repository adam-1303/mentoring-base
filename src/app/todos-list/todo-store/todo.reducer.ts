import { createReducer, on } from "@ngrx/store";
import { Todo } from "../../todos-list/todos-list.component";
import { TodosActions } from "./todos.actions";

export interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

export const todoReducer = createReducer(
  initialState,
  on(TodosActions.set, (state, payload): TodosState => ({
    ...state,
    todos: payload.todos,
  })),
  on(TodosActions.edit, (state, payload) => ({
    ...state,
    todos: state.todos.map((todo): Todo =>
      todo.id === payload.todo.id ? payload.todo : todo
    ),
  })),
  on(TodosActions.create, (state, payload): TodosState => ({
    ...state,
    todos: [...state.todos, payload.todo],
  })),
  on(TodosActions.delete, (state, payload): TodosState => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== payload.id),
  }))
);