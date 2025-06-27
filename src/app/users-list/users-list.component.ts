import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { Store } from "@ngrx/store";
import { UsersActions } from "./store/users.actions";
import { selectUsers } from "./store/users.selectors";

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

export interface Users {
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
      private readonly store = inject(Store);
      public readonly users$ = this.store.select(selectUsers);

      constructor() {
            this.usersApiService.getUsers().subscribe((response: User[]) => {
                  this.store.dispatch(UsersActions.set({ users: response }));
            });
      }

      deleteUser(id: number) {
            this.store.dispatch(UsersActions.delete({ id }));
      };

      editUser(user: User) {
            this.store.dispatch(UsersActions.edit({ user }));
      };

      public createUser(formData: Users) {
            this.store.dispatch(
                  UsersActions.create({
                        user: {
                              id: new Date().getTime(),
                              name: formData.name,
                              username: formData.username,
                              email: formData.email,
                              website: formData.website,
                              company: {
                                    name: formData.companyName
                              },
                        },
                  })
            );
      };
};