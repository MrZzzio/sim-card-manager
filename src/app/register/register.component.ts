import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';

let uniqUser: boolean = true;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  goLogin(): void {
    this.router.navigateByUrl('/api/login');
  }

  register(login: string, password: string): void {
    if (uniqUser) {
      this.userService.register({login, password} as User)
      .subscribe(() => this.goLogin());
    }    
  }

}
