import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";

export interface User {
      id: number;
      name: string;
      username: string;
      email: string;
      adress?: {
            street: string;
            suite: string;
            city: string;
            zipcode: string;
            geo: {
                  lat: string;
                  lng: string;
            };
      };
      phone?: string;
      website: string;
      company: {
            name: string;
            cathPhrase?: string;
            bs?: string;
      };
};

export interface Resu {
      id: number;
      name: string;
      username: string;
      email: string;
      website: string;
      companyName: string;
}

@Component({
      selector: 'app-users-list',
      templateUrl: './users-list.component.html',
      styleUrl: './users-list.component.scss',
      standalone: true,
      imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserFormComponent],
      changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
      readonly usersApiService = inject(UsersApiService);
      readonly usersService = inject(UsersService);
      
      constructor() {
            this.usersApiService.getUsers().subscribe(
                  (response: any) => {
                        this.usersService.setUsers(response)
                  }
            )
      };

      deleteUser(id: number) {
            this.usersService.deleteUser(id)
      };

      editUser(user:any) {
            this.usersService.editUser(user)
      };

      public createUser(formData: Resu) {
      this.usersService.creatUser({
            id: new Date().getTime(),
            name: formData.name,
            username: formData.username,
            email: formData.email,
            website: formData.website,
            company: {
                  name: formData.companyName}
            });
      };
};