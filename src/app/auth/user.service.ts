import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../model/user.model";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';



@Injectable()
export class UserService{

    constructor(private http: HttpClient, private router:Router){}


    proceedToLogin(email: string, password: string): Observable<any> {
      const loginData = {
        email: email,
        password: password
      };
    
      return this.http.post('http://localhost:8080/api/user/login', loginData)
        .pipe(
          catchError((error) => {
            console.error('Login failed. Error:', error);
            throw error;
          })
        );
    }

      getUser() : Observable<User> {
        return this.http.get<User>('http://localhost:8080/api/user/get');
      }

      isLoggedIn(): boolean {
        const token = localStorage.getItem('jwtToken');
        return token !== null && token !== '' && token?.length > 1;
      }
}