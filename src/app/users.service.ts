import { Injectable } from "@angular/core";
import { User } from "./users-list/users-list.component";
import { BehaviorSubject } from "rxjs";

@Injectable ({providedIn: 'root'})
export class UsersService {
   usersSubject= new BehaviorSubject<User[]>([]);
   users: User[] = [];

   setUsers(users: User[]): void {
      this.users = users;
      this.usersSubject.next(users);
   }

   editUser(editedUser: User) {
      this.usersSubject.next( 
         this.usersSubject.value.map(
            (user: User) => user.id === editedUser.id ? editedUser : user
         )
      )
   }

   creatUser(user: User) {
      const existingUser = this.usersSubject.value.find(
         (currentElement) => currentElement.email === user.email);

      if (existingUser !== undefined) {
         alert('ТАКОЙ ПОЛЬЗОВАТЕЛЬ УЖЕ ЕСТЬ')} 
      else {
         this.usersSubject.next([...this.usersSubject.value, user])
         alert('ПОЛЬЗОВАТЕЛЬ ДОБАВЛЕН')
      }
   }
   
   deleteUser(id: number): void {
      const updatedUsers = this.usersSubject.value.filter(user => user.id !== id);
      this.users = updatedUsers; 
      this.usersSubject.next(updatedUsers);
   }
}