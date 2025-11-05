import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeadService } from '../../services/lead.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
@Component({
    selector: 'app-lead-add',
    templateUrl: './lead-add.component.html'
})
export class LeadAddComponent implements OnInit {
    leadForm: FormGroup;
    user: any;
    list: any;
    role: any;
    currency: any[] = [{ name: 'Lakh', value: 'lakh' }, { name: "cr", value: 'cr' }]
    constructor(private fb: FormBuilder, private leadSvc: LeadService, private auth: AuthService, private router: Router, private _api: ApiService) {
        const data = localStorage.getItem('authData');
        if (data) this.role = JSON.parse(data);
        this._api.getAllUsers(this.role._id).subscribe((res) => {
            console.log(res);
            if (res) {
                this.list = res;
            } else {
                this.list = [];
            }
            console.log(this.list);
        })
    }
    ngOnInit() {
        this.leadForm = this.fb.group({
            name: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.email],
            source: ['website'],
            budget: [null],
            currency: [''],
            notes: [''],
            assignedTo: [''],
            followUp: ['', Validators.required],
            time:['',Validators.required]
        });

        // if employee, auto assign to themselves and hide assign control
        if (this.user && this.user.role === 'employee') {
            this.leadForm.get('assignedTo')?.setValue(this.user.id);
        }
    }
    submit() {
        console.log(this.leadForm.value);
        if (this.leadForm.invalid) { this.leadForm.markAllAsTouched(); return; }
        const payload = this.leadForm.value;
        payload.budget = payload.budget + payload.currency;
        delete payload.currency;
        this._api.postLead(payload).subscribe(res => {
            console.log(res);
        });
        // this.leadSvc.add(payload);
        // this.router.navigate(['/leads'])
        this.leadForm.reset({ source: 'website' });
        alert('Lead added');
    }
}