import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeadService } from '../../services/lead.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as XLSX from 'xlsx';
@Component({
    standalone: false,
    selector: 'app-lead-add',
    templateUrl: './lead-add.component.html'
})
export class LeadAddComponent implements OnInit {
    leadForm: FormGroup;
    user: any;
    list: any;
    role: any;
    currency: any[] = [{ name: 'Lakh', value: 'lakh' }, { name: "cr", value: 'cr' }]
    loader: boolean = false;
    constructor(private fb: FormBuilder, private leadSvc: LeadService, private auth: AuthService, private router: Router, private _api: ApiService) {
        const data = localStorage.getItem('authData');
        if (data) this.role = JSON.parse(data);
        this.getAllUsers(this.role._id);
    }

    getAllUsers(id: string) {
        this.loader = true;
        this._api.getAllUsers(id).subscribe((res: any) => {
            console.log(res);
            this.loader = false;
            if (res && !res.error) {
                this._api.show('success', res.message);
                this.list = res.users;
            } else {
                this._api.show('error', res.message);
                this.list = [];
            }
            console.log(this.list);
        })
    }
    ngOnInit() {
        this.createForm();
    }
    createForm() {
        this.leadForm = this.fb.group({
            name: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.email],
            source: ['website'],
            budget: [null],
            currency: [''],
            notes: [''],
            assignedTo: [''],
            followUp: ['', this.role.role != 'admin' ? Validators.required : ''],
            time: ['', this.role.role != 'admin' ? Validators.required : '']
        });

        // if employee, auto assign to themselves and hide assign control
        if (this.user && this.user.role === 'employee') {
            this.leadForm.get('assignedTo')?.setValue(this.user.id);
        }
    }

    onFileChange(event: any) {
        const file = event.target.files[0];
        if (!file) return;

        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = () => {
            const buffer = fileReader.result;
            const workbook = XLSX.read(buffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            console.log(jsonData);
            if (jsonData) {
                const endpoint = '/leads/importLeads';
                this.uploadExcelFile(endpoint, jsonData);
            } // here’s your JSON data
        };
    }

    uploadExcelFile(endpoint: string, data: any) {
        this.loader = true;

        this._api.postLead(endpoint, data).subscribe((res: any) => {
            this.loader = false;
            if (res && !res.error) {
                this._api.show('success', res.message);
            } else {
                this._api.show('error', res.message);
            }
        })
    }

    submit() {
        console.log(this.leadForm.value);
        if (this.leadForm.invalid) { this.leadForm.markAllAsTouched(); this._api.show('error', 'please fill all details'); return; }
        const payload = this.leadForm.value;
        payload.budget = payload.budget + payload.currency;
        delete payload.currency;
        this._api.postLead('/leads', payload).subscribe((res: any) => {
            if (res && !res.error) {
                this._api.show('success', res.message);
                this.router.navigate(['/leads'])
            } else {
                this._api.show('error', res.message);
            }
        });
        this.leadForm.reset({ source: 'website' });
    }
}