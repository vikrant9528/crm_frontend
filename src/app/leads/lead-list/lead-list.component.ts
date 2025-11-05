import { Component, OnInit } from '@angular/core';
import { LeadService } from '../../services/lead.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';


@Component({ selector: 'app-lead-list', templateUrl: './lead-list.component.html' })
export class LeadListComponent implements OnInit {
  leads: any[] = [];
  user: any;
  role: any;
  showModal = false;
  editleads: any;
  timeline: any;

  constructor(private leadSvc: LeadService, private auth: AuthService, private api: ApiService) {
    const data = localStorage.getItem('authData');
    if (data) this.role = JSON.parse(data);
    console.log(this.role);
  }


  ngOnInit() {
    this.getleads('/leads');
  }

  getleads(params) {
    this.api.getAllLeads(params).subscribe((res: any) => {
      if (res && !res.error) {
        this.user = res.leads;
        this.leads = this.visibleLeads(this.role);
        console.log(this.leads);
        this.timeline = res.timeline;
      }
    })
  }
  visibleLeads(data) {
    if (data.role === 'admin') return this.user;
    return this.user.filter(l => l.assignedTo._id === data._id);
  }
  handleOpen(val: any) {
    this.editleads = val;
    this.showModal = true
  }

  handleClose(result: boolean) {
    this.showModal = false;
    if (result) {
      console.log('Confirmed action');
    }
  }
}