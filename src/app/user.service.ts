import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface IUser {
  isAdmin: boolean | null,
  name: string,
  email: string,
}

@Injectable({ providedIn: 'root' })

export class UserService {
  private readonly userSubject$ = new BehaviorSubject<IUser | null>(null)

  public readonly user$ = this.userSubject$.asObservable()

  private user: IUser = {
    name: 'Адам',
    email: 'Магомедов',
    isAdmin: null,
  }

  loginAsAdmin() {
    this.userSubject$.next({ ...this.user, isAdmin: true })
  }

  loginAsUser() {
    this.userSubject$.next({ ...this.user, isAdmin: false })
  }

  get isAdmin() {
    return this.userSubject$.value?.isAdmin
  }

  logout() {
    this.userSubject$.next(null)
  }
}