import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Movie } from '../model/movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MovieService } from '../movie-service.service';

declare var $: any;

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  movies: Movie[] = [];
  searchText: string = '';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router, private movieService: MovieService) { }

  ngOnInit() {
    this.getAllMovies();
  }

  ngAfterViewInit() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  getAllMovies() {
    const url = 'http://localhost:8082/api/v1.0/getAllMovies';
    const token = sessionStorage.getItem('jwtToken');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    this.http.get<Movie[]>(url, httpOptions).subscribe(movies => {
      this.movies = movies;
    });
  }

  getAbbreviation(movieName: string): string {
    let movieWords = movieName.split(' ');

    if (movieWords.length == 1) {
      if(movieName.length === 3){
        return movieName.substring(0, 3).toUpperCase();
      }
      return movieName.substring(0, 2).toUpperCase();
    } else if (movieWords.length <= 3) {
      return movieWords.map(word => word[0]).join('').toUpperCase();
    } else {
      return movieName.substring(0, 3).toUpperCase();
    }
  }

  bookTicket(movieId: number, movieName: string, bookedSeats: number) {
    this.movieService.setMovieData(movieId, movieName, bookedSeats);
    this.router.navigate(['/book-ticket']);
  }
  

}
