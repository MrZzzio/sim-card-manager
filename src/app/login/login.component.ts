import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  goMain(): void {
    this.router.navigateByUrl('');
  }

  goRegister(): void {
    this.router.navigateByUrl('/api/register');
  }

  login(login: string, password: string): void {
    this.userService.login({login, password} as User)
    .subscribe(() => this.goMain());
  }

}
