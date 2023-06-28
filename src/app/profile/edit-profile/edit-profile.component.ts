import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/auth/user.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  user!: User;
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: Observable<User>, private http: HttpClient, private dialogRef: MatDialogRef<EditProfileComponent>) {
    this.data.subscribe((user: User) => {
      this.user = user;
    });
  }

  save(form: NgForm){

    const formData = {
      email: form.value.email,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      mobilePhone: form.value.mobilePhone
    };
    
    this.http.post("http://localhost:8080/api/user/update", formData).subscribe(
      response =>{
        this.dialogRef.close();        
      }
    );
    
    
  }

}
