import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginResponse } from './model/login-response';
import { User } from './model/user';
import { Observable } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request with login credentials and return login response', () => {
    const loginID = 'testuser';
    const password = 'testpassword';

    const loginResponse: LoginResponse = {
      user: [{
        userName: 'testuser',
        userPassword: 'password'
      }],
      jwtToken: 'dummyToken'
    };

    service.login(loginID, password).subscribe((response: LoginResponse) => {
      expect(response).toEqual(loginResponse);
    });

    const req = httpMock.expectOne(`${(service as any).apiUrlMovieApp}/call/consumer/authenticate`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ userName: loginID, userPassword: password });

    req.flush(loginResponse);
  });


});