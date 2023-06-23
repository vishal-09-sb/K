import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {

  constructor(private router: Router, private authService: AuthService) {}

  logout(): void {
    this.authService.logout().subscribe(() => {
        this.router.navigate(['/login']);
    }, error => {
        // Handle error here
        console.error(error);
    });
}



}
