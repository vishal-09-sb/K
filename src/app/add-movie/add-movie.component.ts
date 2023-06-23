import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  movieForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.movieForm = this.formBuilder.group({
      movieName: ['', Validators.required],
      theatreName: ['', Validators.required]
    });
  }

  navigateToAdminDashboard(): void {
    this.router.navigate(['/admin-dashboard']);
  }

  submitForm() {
    if (this.movieForm.invalid) {
      return;
    }

    const url = 'http://localhost:8082/api/v1.0/admin/addMovie';
    const token = sessionStorage.getItem('jwtToken');
    const body = {
      movieName: this.movieForm.value.movieName,
      theatreName: this.movieForm.value.theatreName
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    console.log('Movie Name:', this.movieForm.value.movieName);
    console.log('Theatre Name:', this.movieForm.value.theatreName);

    this.http.post(url, body, httpOptions).subscribe(
      () => {
        console.log('Movie added successfully');
        // Handle success response here
        this.navigateToAdminDashboard();
      },
      (error) => {
        console.error(error);
        // Handle error response here
      }
    );
  }
}


