import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../model/login-response';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'loginID': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }
  

  onSubmit(): void {
    console.log(this.loginForm.value);
    this.login(this.loginForm.value);
  }

  logout(): void {
    // clear specific session storage items
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('jwtToken');
  }

  login(userData: any): void {
    this.authService.login(userData.loginID, userData.password).subscribe(
      (response: LoginResponse) => {
        console.log(response);

        // Making sure the user is logged out
        this.logout();
        // Handle your response here
        sessionStorage.setItem('user', JSON.stringify(response.user));
        sessionStorage.setItem('jwtToken', response.jwtToken);

        console.log("Logging Session Item -> ");

        let userItem = sessionStorage.getItem('user');
        let jwtTokenItem = sessionStorage.getItem('jwtToken');

        if (userItem !== null) {
          let user = JSON.parse(userItem);
          console.log("UserName -> ", user.userName);
          console.log("userPassword -> ", user.userPassword);

          if (user.userName === 'admin123') {
            // Navigate to the admin-dashboard route
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/user-dashboard']);
          }
        } else {
          console.error("User not found in sessionStorage");
        }

        if (jwtTokenItem !== null) {
          let jwtToken = jwtTokenItem;
          console.log("JwtToken -> ", jwtToken);
        } else {
          console.error("JwtToken not found in sessionStorage");
        }

        this.snackBar.open('Login Successful', 'OK', {
          duration: 2000,
          verticalPosition: 'top'
        });
      },
      error => {
        console.error(error);
        this.snackBar.open('Incorrect Login ID or Password', 'OK', {
          duration: 2000,
          verticalPosition: 'top'
        });
      }
    );
  }
}
