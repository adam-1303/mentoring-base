import { Injectable } from "@angular/core";
import { User } from "./users-list/users-list.component";

@Injectable({providedIn: 'root'})
export class UsersService {
   users: User[] = [];

   setUsers(users: User[]) {}
}