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

  uniqUser: boolean = true;

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
    .subscribe(res => {
      this.uniqUser = res;
      console.log(this.uniqUser);
    });
  }

  confirmPass(pass: string, conf: string): boolean {
    return pass !== conf;
  }

}
