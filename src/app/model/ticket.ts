export class Ticket {
    transactionId: number;
    movie_id_fk: number;
    movieName: string;
    totalSeat: number;
    seatsAvailable: number;
    seatsBooked: number;
  
    constructor(
      transactionId: number,
      movie_id_fk: number,
      movieName: string,
      totalSeat: number,
      seatsAvailable: number,
      seatsBooked: number
    ) {
      this.transactionId = transactionId;
      this.movie_id_fk = movie_id_fk;
      this.movieName = movieName;
      this.totalSeat = totalSeat;
      this.seatsAvailable = seatsAvailable;
      this.seatsBooked = seatsBooked;
    }
  }
  