import { createReducer, on } from "@ngrx/store";
import { User } from "../users-list.component";
import { UsersActions } from "./users.actions";

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const userReducer = createReducer(
  initialState,
  on(UsersActions.set, (state, payload): UsersState => ({
    ...state,
    users: payload.users,
  })),
  on(UsersActions.edit, (state, payload) => ({
    ...state,
    users: state.users.map((user): User =>
      user.id === payload.user.id ? payload.user : user
    ),
  })),
  on(UsersActions.create, (state, payload): UsersState => ({
    ...state,
    users: [...state.users, payload.user],
  })),
  on(UsersActions.delete, (state, payload): UsersState => ({
    ...state,
    users: state.users.filter((user) => user.id !== payload.id),
  }))
);