import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { bookmovie } from '../model/bookmovie';
import { MovieService } from '../movie-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent {
  movie!: bookmovie;
  numberOfSeats: number = 1;
  seatsArray: number[] = [];

  constructor(private route: ActivatedRoute, private movieService: MovieService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.movie = this.movieService.getMovieData();

    console.log(this.movie.movieId, this.movie.movieName, this.movie.bookedSeats);

    for (let i = 1; i <= 100 - this.movie.bookedSeats; i++) {
      this.seatsArray.push(i);
    }
  }

  

  bookSeats() {
    console.log("Number of seats booked: ", this.numberOfSeats);
    const url = `http://localhost:8082/api/v1.0/ticket/add/${this.movie.movieId}/${this.numberOfSeats}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
      })
    };
    
    this.http.post(url, {}, httpOptions).subscribe(
      () => {
        console.log('Ticket booked successfully');
        this.router.navigate(['/user-dashboard']);
      },
      (error) => {
        console.error(error);
        // Handle error response here
      }
    );
  }

}
