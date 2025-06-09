import { Injectable } from "@angular/core";
import { User } from "./users-list/users-list.component";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable ({providedIn: 'root'})
export class UsersService {
   usersSubject = new BehaviorSubject<User[]>([]);
   users$: Observable<User[]> = this.usersSubject.asObservable();

   setUsers(users: User[]): void {
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
         (currentElement) => currentElement.email === user.email
      );

      if (existingUser !== undefined) {
         alert('ТАКОЙ ПОЛЬЗОВАТЕЛЬ УЖЕ ЕСТЬ')} 
      else {
         this.usersSubject.next([...this.usersSubject.value, user])
         alert('ПОЛЬЗОВАТЕЛЬ ДОБАВЛЕН')
      }
   }
   
   deleteUser(id: number): void {
      const updatedUsers = this.usersSubject.value.filter((user: User): boolean => user.id !== id);
      this.usersSubject.next(updatedUsers);
   }
}