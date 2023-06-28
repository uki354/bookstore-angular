import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from './auth/logout/logout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookstore';


  constructor(private dialog: MatDialog, private router: Router){};

  hasToken(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !!token; 
  }

  openLogoutDialog() {
    const dialogRef = this.dialog.open(LogoutComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.removeItem("jwtToken");
        this.router.navigate(['']);

      }
    });
  }


}
