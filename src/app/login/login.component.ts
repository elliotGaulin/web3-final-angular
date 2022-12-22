import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  user: User = {
    username: '',
    password: ''
  };
  loginError: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.login(this.user).subscribe(user => {
      console.log(user);
      if (user.token) {
        this.router.navigate(['/']);
      } else {
        this.loginError = $localize `Invalid username or password`;
        console.log('login failed');
      }
    });
  }

}
