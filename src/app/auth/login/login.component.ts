import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  errorExists = false;
  errorText = "";

  constructor(private userService: UserService, private router: Router){}




  onSubmit(form: NgForm) {
    this.userService.proceedToLogin(form.value.email, form.value.password)
      .subscribe(
        (response: any) => {
          localStorage.setItem('jwtToken', response);
          this.router.navigate(['']);
        },
        (error: any) => {
          this.errorExists = true;
          this.errorText = "Invalid password or email address. Try again"
        }
      );
  }
  

  

}
