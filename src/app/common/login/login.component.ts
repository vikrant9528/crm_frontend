import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: any;
  success: any;
  showPassword: boolean = false;
  constructor(private _api: ApiService, private _fb: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this._fb.group({
      email: this._fb.control('', Validators.required),
      password: this._fb.control('', Validators.required)
    })
  }

  submit() {
    if (this.loginForm.valid) {
      this._api.login(this.loginForm.value).subscribe((res: any) => {
        if (res && !res.error) {
          localStorage.setItem('authData', JSON.stringify(res.details))
          localStorage.setItem('token', res.token);
          this.router.navigate(['/leads']);
          this.loginForm.reset();
        } else {
          alert(`login failed${res.message}`)
        }
      })
    }
  }

}
