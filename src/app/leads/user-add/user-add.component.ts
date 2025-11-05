import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {
  user = {
    name: '',
    phone: '',
    email: '',
    address: '',
    designation: '',
    role: 'employee'
  };

  message = '';
  error = '';

  constructor(private http: HttpClient , private api: ApiService) {}

  submitForm() {
    this.api.addUser(this.user).subscribe((res)=>{
      console.log(res);
      
    })
  }
}
