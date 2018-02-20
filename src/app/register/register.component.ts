import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private uniqUser: boolean = true;

  private invalidLogin: boolean = true;

  private samePass: boolean = true;

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  goLogin(): void {
    this.router.navigateByUrl('/api/login');
  }

  register(login: string, password: string): void {
    if (this.uniqUser) {
      this.userService.register({login, password} as User)
      .subscribe(() => this.goLogin());
    }
  }

  checkRegister(login: string): void {
    this.userService.checkRegister(login)
    .subscribe(res => this.uniqUser = res);
  }

  confirmPass(pass: string, conf: string): boolean {
    this.samePass = pass === conf;
    return this.samePass;
  }

  canRegister(): boolean {
    return this.samePass && !this.invalidLogin;
  }

  checkLogin(): boolean {
    return this.invalidLogin;
  }

  validateLogin(str: string): void {
    str.length < 3 ? this.invalidLogin = true : this.invalidLogin = false;
  }

}
