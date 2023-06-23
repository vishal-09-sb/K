export class bookmovie{


    movieId: number;
    movieName: string;
    bookedSeats: number;


    constructor(
        movieId: number,
        movieName: string,
        bookedSeats: number
      ) {
        this.movieId = movieId;
        this.movieName = movieName;
        this.bookedSeats = bookedSeats;
      }

}