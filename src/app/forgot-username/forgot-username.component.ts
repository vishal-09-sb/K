import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

import { Router } from '@angular/router';




@Component({

  selector: 'app-forgot-username',

  templateUrl: './forgot-username.component.html',

  styleUrls: ['./forgot-username.component.css']

})

export class ForgotUsernameComponent implements OnInit {

  forgotUserNameForm!: FormGroup;

  userName!: string;

  isPopupVisible = false;

  popupMessage = '';

  isError = false;




  constructor(private authService: AuthService, private router: Router) { }




  ngOnInit(): void {

    this.userName = '';

    this.forgotUserNameForm = new FormGroup({

      'email': new FormControl(null, Validators.required),

      'password': new FormControl(null, Validators.required),

    });

  }




  onSubmit(): void {

    this.getUserName();

  }




  getUserName(): void {

    const email = this.forgotUserNameForm.value.email.trim();

    const password = this.forgotUserNameForm.value.password.trim();




    this.authService.forgotUserName(email, password).subscribe(

      (response: any) => {

        if (response === '') {

          this.popupMessage = 'No User found, username or password is incorrect.';

          this.isError = true;

        } else {

          this.popupMessage = 'Username: ' + response;

          this.isError = false;

        }

        this.isPopupVisible = true;

      },

      (error: any) => {

        console.error('HTTP Error:', error);

        this.popupMessage = 'An error occurred: ' + error.message;

        this.isPopupVisible = true;

        this.isError = true;

      }

    );

  }




  closePopup(): void {

    this.isPopupVisible = false;

    if (!this.isError) {

      this.router.navigate(['/login']); // Navigate to the login component

    } else {

      this.router.navigate(['/login']); // Alternatively, you can customize the error handling and navigate to a different error page if desired

    }

  }

 

}