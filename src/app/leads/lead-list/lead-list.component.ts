import { Component, OnInit } from '@angular/core';
import { LeadService } from '../../services/lead.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
// import html2canvas from 'html2canvas'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({ standalone: false, selector: 'app-lead-list', templateUrl: './lead-list.component.html' })
export class LeadListComponent implements OnInit {
  leads: any[] = [];
  user: any;
  role: any;
  showModal = false;
  editleads: any;
  timeline: any;
  loader: boolean = false;
  searchText = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalLeads = 0;
  allPages = 0;

  constructor(private leadSvc: LeadService, private auth: AuthService, private api: ApiService) {
    const data = localStorage.getItem('authData');
    if (data) this.role = JSON.parse(data);
    console.log(this.role);
  }


  ngOnInit() {
    this.getleads(`/leads?page=${this.currentPage}&limit=${this.itemsPerPage}`);
  }

  getleads(params) {
    this.loader = true;
    this.api.getAllLeads(params).subscribe((res: any) => {
      this.loader = false;
      if (res && !res.error) {
        this.api.show('success', res.message)
        // this.user = res.leads;
        console.log(this.leads);
        this.timeline = res.timeline;
        this.leads = res.leads;
    this.totalLeads = res.pagination.totalLeads;
    this.allPages = res.pagination.totalPages;
      } else {
        this.api.show('error', res.message);
      }
    })
  }


  get filteredLeads() {
    if (!this.searchText) return this.leads;
    const t = this.searchText.toLowerCase();
    return this.leads.filter(
      l =>
        l.name?.toLowerCase().includes(t) || l.assignedTo?.name?.toLowerCase().includes(t)
    );
  }

  


  // visibleLeads(data) {
  //   // if (data.role === 'admin') return this.user;
  //   // return this.user.filter(l => l.assignedTo._id === data._id);
  // }
  handleOpen(val: any) {
    this.editleads = val;
    this.showModal = true
  }
  deleteLead(lead: any) {
    this.loader = true;
    this.api.deleteApi('/leads/' + lead._id).subscribe((res: any) => {
      this.loader = false;
      if (res && !res.error) {
        this.api.show('success', res.message);
        this.getleads('/leads')
      } else {
        this.api.show('error', res.message);
      }
    })
  }

  handleClose(result: boolean) {
    this.showModal = false;
    this.getleads('/leads')
    if (result) {
      console.log('Confirmed action');
    }
  }

  get totalPages() {
  return Math.ceil(this.totalLeads / this.itemsPerPage);
}

goToNextPage() {
  if (this.currentPage < this.totalPages) this.changePage(this.currentPage + 1);
}

goToPrevPage() {
  if (this.currentPage > 1) this.changePage(this.currentPage - 1);
}

changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.getleads(`/leads?page=${page}&limit=${this.itemsPerPage}`);
  }
}
  exportToExcel(): void {
    const formattedLeads = this.leads.map((lead: any) => ({
      Name: lead.name,
      Phone: lead.phone,
      Email: lead.email,
      Source: lead.source,
      Status: lead.status,
      Budget: lead.budget,
      Remark: lead.notes,
      callTrack: lead.call_track,
      whatsAppTrack: lead.whatsapp_track,
      AssignedTo: lead.assignedTo?._id || '-',
      EmployeeName: lead.assignedTo?.name || '-',// ✅ Fix here
      Role: lead.assignedTo?.role || '-',
      FollowUp: lead.followUp ? new Date(lead.followUp).toLocaleDateString() : '-',
      Time: lead.time,
      CreatedAt: new Date(lead.createdAt).toLocaleDateString(),
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedLeads);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Leads': worksheet },
      SheetNames: ['Leads']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    saveAs(blob, `Leads_${new Date().getTime()}.xlsx`);
  }

  // exportPNG() {
  //   const target = document.getElementById('lead-export-area');

  //   if (!target) return;

  //   html2canvas(target, { scale: 2 }).then(canvas => {
  //     const imageUrl = canvas.toDataURL('image/png');

  //     const link = document.createElement('a');
  //     link.href = imageUrl;
  //     link.download = `Leads_${Date.now()}.png`;
  //     link.click();
  //   });
  // }
}