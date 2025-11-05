// signup.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  signupForm: FormGroup;
  error = '';
  success = '';

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      password: ['', Validators.required],
      role: ['employee', Validators.required],
      empCode: ['', Validators.required]
    });
  }

  submit() {
    if (this.signupForm.invalid) return;
    this.api.signup(this.signupForm.value).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/login'])
    })
  }
}
