import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseUrl = 'https://final-web3-elliot.onrender.com/users';
  user?: User;
  authChanged = new EventEmitter<User>();

  constructor(private httpClient: HttpClient) { 
    if (localStorage.getItem('user'))
      this.user = JSON.parse(localStorage.getItem('user')!);
  }

  login(user: User ) : Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + '/login', user).pipe(
      tap((user: User) => {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        this.authChanged.emit(user);
      }
    ));
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('user');
    this.authChanged.emit(this.user);
  }

  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + this.user?.token
    }
  }

  isLoggedIn() : boolean {
    return this.user != undefined;
  }
}
