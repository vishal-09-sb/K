import { Ticket } from './ticket';

export class Movie {
  movieId: number;
  movieName: string;
  theatreName: string;
  seatsAvailable: number;
  bookedSeats: number;
  ticketList: Ticket[];
  editMode: boolean | undefined;

  constructor(
    movieId: number,
    movieName: string,
    theatreName: string,
    seatsAvailable: number,
    bookedSeats: number,
    ticketList: Ticket[],
    editMode: boolean,
  ) {
    this.movieId = movieId;
    this.movieName = movieName;
    this.theatreName = theatreName;
    this.seatsAvailable = seatsAvailable;
    this.bookedSeats = bookedSeats;
    this.ticketList = ticketList;
    this.editMode = editMode;
  }
}
