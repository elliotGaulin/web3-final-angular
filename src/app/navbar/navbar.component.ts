import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user?: User;

  constructor(private userService: UserService) {
    this.user = this.userService.user;
    this.userService.authChanged.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.userService.logout();
  }
}
