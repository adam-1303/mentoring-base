import { NgFor } from "@angular/common";
import { Component, inject } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";

export interface User {
      id: number;
      name: string;
      username: string;
      email: string;
      adress: {
            street: string;
            suite: string;
            city: string;
            zipcode: string;
            geo: {
                  lat: string;
                  lng: string;
            };
      };
      phone: string;
      website: string;
      company: {
            name: string;
            cathPhrase: string;
            bs: string;
      };
}

@Component({
      selector: 'app-users-list',
      templateUrl: './users-list.component.html',
      styleUrl: './users-list.component.scss',
      standalone: true,
      imports: [NgFor, UserCardComponent]
})

export class UsersListComponent {
      readonly usersApiService = inject(UsersApiService);
      readonly usersService = inject(UsersService);
      users = this.usersService.users;


      constructor() {
      this.usersApiService.getUsers().subscribe(
            (response: any) => {
                  this.users = response;
            }
      )
      }

      deleteUser(id: number) {
            this.users = this.users.filter(
                  item => {
                        if (id === item.id) {
                              return false}
                        else {
                              return true}
                  }
            )
      }
}