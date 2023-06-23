import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['forgotPassword']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ForgotPasswordComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.forgotPasswordForm).toBeDefined();
    expect(component.forgotPasswordForm.get('secretQuestion')).toBeDefined();
    expect(component.forgotPasswordForm.get('secretAnswer')).toBeDefined();
    expect(component.forgotPasswordForm.get('newPassword')).toBeDefined();
    expect(component.forgotPasswordForm.get('userName')).toBeDefined();
  });

  it('should handle error during form submission', waitForAsync(() => {
    const mockError = { message: 'An error occurred' };
    const formValues = {
      secretQuestion: 'Question',
      secretAnswer: 'Answer',
      newPassword: 'newPassword',
      userName: 'username'
    };

    mockAuthService.forgotPassword.and.returnValue(throwError(mockError));

    component.forgotPasswordForm.setValue(formValues);
    component.onSubmit();

    fixture.whenStable().then(() => {
      expect(mockAuthService.forgotPassword).toHaveBeenCalledWith(
        formValues.secretQuestion,
        formValues.secretAnswer,
        formValues.newPassword,
        formValues.userName
      );
    });
  }));
});