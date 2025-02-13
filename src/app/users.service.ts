import { Injectable } from "@angular/core";
import { User } from "./users-list/users-list.component";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersService {
   usersSubjest = new BehaviorSubject<User[]>([]);
   users: User[] = [];

   setUsers(users: User[]) {
      this.users = users;
      this.usersSubjest.next(users);
   }

   editUser(editedUser: User) {
   
      this.usersSubjest.next(
         this.usersSubjest.value.map(
            user => {
               if (user.id === editedUser.id) {
                  return editedUser}
               else {
                  return user}
            }
         )
      )
   }

   creatUser(user: User) {
      this.usersSubjest.next(
         [...this.usersSubjest.value, user]
      )
   }

   deleteUser(id: number) {
      this.usersSubjest.next(
         this.usersSubjest.value.filter(
            item => {
               if (id === item.id) {
                  return false}
            else {return true}
            }
         )
      )  
   }
}