import { AfterViewInit, Component } from '@angular/core';
import { UserService } from '../auth/user.service';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../model/invoice.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements AfterViewInit {

  user$!: Observable<User>;
  invoices!: Observable<Invoice[]>
  displayedColumns = ['id', 'books', 'totalPrice', 'issuedAt'];
  selectedBook: { [key: number]: string } = {};


  constructor(private userService: UserService, private dialog :MatDialog, private http: HttpClient){}

  ngAfterViewInit(): void {    
    this.user$ = this.userService.getUser();
   this.invoices = this.getInvoices();

   this.invoices.subscribe((invoices: Invoice[]) => {
    invoices.forEach((invoice: Invoice) => {
      this.selectedBook[invoice.id] = invoice.books[0].name;
    });
  });
  }

  edit(user: Observable<User>){
    const dialogRef = this.dialog.open(EditProfileComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.user$ = this.userService.getUser();
    })
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>("http://localhost:8080/api/user/getInvoices");
  }
  

}
