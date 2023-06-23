import { Injectable } from '@angular/core';
import { bookmovie } from './model/bookmovie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movieId: number = 0;
  movieName: string = '';
  bookedSeats: number = 0;
  
  // Use the ! operator to tell TypeScript that movBook will be assigned before it's used.
  movBook!: bookmovie; 

  movieList = [];

  setMovieData(movieId: number, movieName: string, bookedSeats: number) {
    this.movieId = movieId;
    this.movieName = movieName;
    this.bookedSeats = bookedSeats;
    console.log("Logging set movie details");
    console.log("Movie ID - ", this.movieId);
    console.log("Movie Name - ", this.movieName);
    console.log("Booked Seats - ", this.bookedSeats);

    this.movBook = new bookmovie(this.movieId, this.movieName, this.bookedSeats);
  }

  getMovieData(): bookmovie {
    return new bookmovie(this.movieId, this.movieName, this.bookedSeats);
  }

  

}