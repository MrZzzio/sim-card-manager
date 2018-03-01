import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { UserService } from './user.service';

describe('UserService', () => {

  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    userService = TestBed.get(UserService);
 });

 it('should be created', () => {
  expect(userService).toBeTruthy();
  });
});
