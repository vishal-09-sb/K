import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from './model/login-response';
import { Observable } from 'rxjs';
import { Movie } from './model/movie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlMovieApp = 'http://localhost:8082';
  private apiUrlAuthApp = 'http://localhost:9091';

  constructor(private http: HttpClient) { }

  login(loginID: string, password: string): Observable<LoginResponse> {
    const url = `${this.apiUrlMovieApp}/call/consumer/authenticate`;
    
    return this.http.post<LoginResponse>(url, { userName: loginID, userPassword: password });
  }

  forgotPassword(secretQuestion: string, secretAnswer: string, newPassword: string, userName: string): Observable<any> {
    const url = `${this.apiUrlAuthApp}/user/forgetpassword`;
    return this.http.post<any>(url, { secretQuestion, secretAnswer, newPassword, userName });
  }

  forgotUserName(email: string, password: string): Observable<string> {
    const url = `${this.apiUrlAuthApp}/username/forget/${email}/${password}`;
    return this.http.get<string>(url, { responseType: 'text' as 'json' });
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('user') !== null;
  }

  isAdmin(): boolean {
    let userString = sessionStorage.getItem('user');
    if (userString) {
        try {
            let user = JSON.parse(userString);
            return user && user.userName === 'admin123';
        } catch (error) {
            console.error('Error parsing user data from sessionStorage', error);
            return false;
        }
    } else {
        return false;
    }
}

isUser(): boolean {
  let userString = sessionStorage.getItem('user');

  if (userString) {
    try {
        let user = JSON.parse(userString);
        return user && user.userName !== 'admin123';
    } catch (error) {
        console.error('Error parsing user data from sessionStorage', error);
        return false;
    }
} else {
    return false;
}

}


logout(): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  const url = `${this.apiUrlMovieApp}/call/consumer/logout`;
  sessionStorage.clear();
  return this.http.post(url, {}, {responseType: 'text'});

}

  getAllMovies(): Observable<Movie[]>{
    const url = 'http://localhost:8082/api/v1.0/getAllMovies';
    const token = sessionStorage.getItem('jwtToken');
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
  
    return this.http.get<Movie[]>(url);
  }
  
  
  
  

}