import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Movie } from '../model/movie';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  movies: Movie[] = [];
  searchText: string = '';
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getAllMovies();
    //this.getMov();
    
    
  }

  

  getAllMovies() {
    const url = 'http://localhost:8082/api/v1.0/getAllMovies';
    const token = sessionStorage.getItem('jwtToken');
  
    console.log("Token -> ", token);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    console.log("httpOptions -> ", httpOptions);
    this.http.get<Movie[]>(url, httpOptions).subscribe(movies => {
      this.movies = movies.map(movie => ({
        ...movie,
        editMode: false
      }));
      console.log(this.movies);
    });
  }

  deleteMovie(movieName: string, theatreName: string): void {
    const url = `http://localhost:8082/api/v1.0/admin/delete/${movieName}/${theatreName}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
      }),
      responseType: 'text' as 'json' // here
    };
    this.http.delete(url, httpOptions).subscribe(
      () => {
        console.log("Reloading admin dashboard after delete!!");
        this.ngOnInit();
      },
      (error) => {
        console.error(error);
      }
    );
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

// Define the array of colors. This can be any set of colors you want.
colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];

getAbbreviationColor(abbreviation: string): string {
  let hash = 0;
  for (let i = 0; i < abbreviation.length; i++) {
    // Generate a simple hash based on the abbreviation characters
    hash += abbreviation.charCodeAt(i);
  }

  // Use the hash to select a color from the array
  let color = this.colors[hash % this.colors.length];
  return color;
}

showDisabledMessage(movieName: string, theatreName: string): void {
  alert(`The delete button is disabled because the movie "${movieName}" in theatre "${theatreName}" is already booked and cannot be deleted.`);
}



navigateToAddMovie(): void {
  this.router.navigate(['/add-movie']);
}

toggleEditMode(movie: Movie) {
  movie.editMode = !movie.editMode;
}

saveMovie(movie: Movie) {
  const url = `http://localhost:8082/api/v1.0/admin/updateMovie/${movie.movieId}`;
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
    })
  };
  const body = {
    movieName: movie.movieName
  };

  this.http.put(url, body, httpOptions).subscribe(
    () => {
      console.log('Movie updated successfully');
      // Handle success response here
    },
    (error) => {
      console.error(error);
      // Handle error response here
    }
  );

  // Exit edit mode after saving
  movie.editMode = false;
}

  
  
}