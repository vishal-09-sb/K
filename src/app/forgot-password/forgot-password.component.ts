import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      'secretQuestion': new FormControl(null, Validators.required),
      'secretAnswer': new FormControl(null, Validators.required),
      'newPassword': new FormControl(null, Validators.required),
      'userName': new FormControl(null, Validators.required),
    });
  }

  onSubmit(): void {
    const trimmedValues = {
      'secretQuestion': this.forgotPasswordForm.value.secretQuestion.trim(),
      'secretAnswer': this.forgotPasswordForm.value.secretAnswer.trim(),
      'newPassword': this.forgotPasswordForm.value.newPassword.trim(),
      'userName': this.forgotPasswordForm.value.userName.trim(),
    };

    this.authService.forgotPassword(trimmedValues.secretQuestion, trimmedValues.secretAnswer, trimmedValues.newPassword, trimmedValues.userName).subscribe(
      (response: any) => {
        console.log(response);
        alert('Password: ' + response);
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error(error);
    
      }
    );
  }
}
