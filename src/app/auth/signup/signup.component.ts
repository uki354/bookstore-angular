import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private http: HttpClient, private userService: UserService){}



  onSubmit(form: NgForm){
    if(form.valid){
      const formData = {
        email: form.value.email,
        password: form.value.password,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        address: form.value.address,
        mobilePhone: form.value.mobilePhone
      };

      this.http.post("http://localhost:8080/api/user/signup",formData).subscribe(
        response =>{
          this.userService.proceedToLogin(form.value.email, form.value.password);
        },
        error =>{
          console.log("error ", error);
        }

      )
        
      
    }
  }



}
