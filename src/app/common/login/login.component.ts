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
  showPassword: boolean = false;
  loader:boolean = false;
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
      this.loader = true;
      this._api.login(this.loginForm.value).subscribe((res: any) => {
        this.loader = false;
        if (res && !res.error) {
          localStorage.setItem('authData', JSON.stringify(res.details))
          localStorage.setItem('token', res.token);
          this._api.show('success',res.message)
          this.router.navigate(['/followups']);
          this.loginForm.reset();
        } else {
          this._api.show('error',res.message);
        }
      })
    }else{
      this._api.show('error','please fill all the details');
    }
  }

}
