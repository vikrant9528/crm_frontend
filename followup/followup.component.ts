import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrl: './followup.component.scss'
})
export class FollowupComponent implements OnInit {

  authData: any;
  followups: any = [];

  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    const auth = localStorage.getItem('authData');
    if (auth) {
      this.authData = JSON.parse(auth);
      console.log(this.authData);
      this.getFollowups(this.authData._id);
    }
  }

  getFollowups(id: string) {
    this._api.getApi('/followups/' + id).subscribe((res: any) => {
      console.log(res);
      if (res && !res.error) {
        // this.followups = res.followups
         this.followups = {
          today : res.followups.today,
          tomorrow : res.followups.tomorrow,
          dayAfter : res.followups.dayAfterTomorrow
         };
         console.log(this.followups);
      }
    });
  }

  tabs = [
    { id: 'today', label: 'Today' },
    { id: 'tomorrow', label: 'Tomorrow' },
    { id: 'dayAfter', label: '+2 Days' }
  ];

  activeTab = 'today';

  // followups: any = {
  //   today: [
  //     { leadName: 'Aryan', phone: '+919876543210', date: '2025-11-04', time: '03:30 PM', type: 'Call', status: 'Hot', note: 'Send pricing asap' },
  //     { leadName: 'Neha', phone: '+919876543210', date: '2025-11-04', time: '11:00 AM', type: 'Meeting', status: 'Warm', note: 'Demo follow-up' }
  //   ],
  //   tomorrow: [
  //     { leadName: 'Vikram', phone: '+919876543210', date: '2025-11-05', time: '10:00 AM', type: 'Email', status: 'Cold', note: 'Send brochure' }
  //   ],
  //   dayAfter: [
  //     { leadName: 'Rahul', phone: '+919876543210', date: '2025-11-06', time: '04:00 PM', type: 'Call', status: 'Hot', note: 'Close the deal' }
  //   ]
  // };

  getList() {
    return this.followups[this.activeTab];
  }

  call(phone: string) {
    window.location.href = `tel:${phone}`;
  }

  openWhatsApp(phone: string) {
    const message = encodeURIComponent('Thanks for reaching True Property Consulting. make you dream homes comes true')
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }

}
