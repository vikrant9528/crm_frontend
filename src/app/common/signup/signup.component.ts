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
  loader:boolean = false;
  userProfile:any = '';

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    localStorage.removeItem('authData');
    localStorage.removeItem('token')
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      file:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      password: ['', Validators.required],
      role: ['employee', Validators.required],
      empCode: ['', Validators.required]
    });
  }

    handleInputChange(e: any) {
    let file = e.target.files[0];
    if (file) {
      this.signupForm.get('file').setValue(file);
      const url = (URL.createObjectURL(file));
      console.log(url);
      if (url) {
        this.userProfile = url
      }
    }
  }

  submit() {
    if (this.signupForm.invalid){
      this.api.show('error','please fill the form details');
      return;
    }
    const params = this.signupForm.value;
    const formData = new FormData();
    const keys = Object.keys(params);
    for(let key of keys){
      formData.append(key,params[key]) 
    }
    this.loader = true;
    this.api.signup(formData).subscribe((res: any) => {
      this.loader = false;
      if(res && !res.error){
        console.log(res);
        this.api.show('success',res.message)
        this.router.navigate(['/login'])
      }else{
        this.api.show('error',res.message)
      }
    })
  }
}
