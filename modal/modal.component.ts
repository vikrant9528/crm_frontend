import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
  @Input() open = false;
  @Input() leads: any;
  @Output() closed = new EventEmitter<boolean>();
  @Input() timeline: any;
  authData: any;
  editForm: FormGroup;
  list: any[] = [];
  status: any = [{ name: 'New', value: 'new' }, { name: "Interested", value: "interested" }, { name: 'Not Interested', value: 'not_interested' }, { name: 'Site Visit', value: 'site_visit' }, { name: "Closed", value: "closed" }];
  constructor(private _api: ApiService, private _fb: FormBuilder, private _cdr: ChangeDetectorRef) {
    const data = localStorage.getItem('authData');
    if (data) this.authData = JSON.parse(data);
    this.createForm();
    this._api.getAllUsers(this.authData._id).subscribe((res: any) => {
      if (res) {
        this.list = res;
      } else {
        this.list = [];
      }
      console.log(this.list);
      console.log(this.leads);
      console.log(this.timeline);

    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.editForm.patchValue(this.leads);
      this.editForm.get('assignedTo').setValue(this.leads.assignedTo._id);
      if (this.leads.followUp) {
        const date = new Date(this.leads.followUp);
        const formattedDate = date.toISOString().split('T')[0];
        this.editForm.get('followUp').setValue(formattedDate);
      }
      console.log(this.editForm.value)
    }, 500);

  }

  createForm() {
    this.editForm = this._fb.group({
      email: this._fb.control('', Validators.required),
      phone: this._fb.control('', Validators.required),
      name: this._fb.control('', Validators.required),
      budget: this._fb.control('', Validators.required),
      followUp: this._fb.control('', Validators.required),
      notes: this._fb.control('', Validators.required),
      status: this._fb.control('', Validators.required),
      assignedTo: ['']
    })
  }

  close() {
    this.closed.emit(false);
  }

  confirm() {
    if (this.editForm.valid) {
      this.editLeadDetails(`/leads/${this.leads._id}`, this.editForm.value)
    }
  }

  editLeadDetails(url, data) {
    this._api.putApi(url, data).subscribe((res: any) => {
      if (res && !res.error) {
        this.closed.emit(true);
      }
    })
  }
}
