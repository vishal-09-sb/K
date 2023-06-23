// import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth-interceptor.service';

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add Authorization header with token if token exists', () => {
    const token = 'fakeToken';
    sessionStorage.setItem('jwtToken', token);

    httpClient.get('/api/data').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('/api/data');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush({}); // Mock empty response
  });

  it('should not add Authorization header if NoAuth header is set to True', () => {
    httpClient.get('/api/data', { headers: { 'NoAuth': 'True' } }).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('/api/data');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({}); // Mock empty response
  });

});