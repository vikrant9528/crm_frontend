import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
@Component({
  standalone: false,
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrl: './followup.component.scss'
})
export class FollowupComponent implements OnInit {

  authData: any;
  followups: any = [];
  swipedItem: any = null;
  lastAction: { item: any, oldStatus: string } | null = null;
  showUndo = false;
  swipeDirection: 'left' | 'right' | null = null;
  loader: boolean = false;

  constructor(private _api: ApiService, private router: Router) { }

  ngOnInit(): void {
    const auth = localStorage.getItem('authData');
    if (auth) {
      this.authData = JSON.parse(auth);
      console.log(this.authData);
      this.getFollowups(this.authData._id);
    }
  }

  getFollowups(id: string) {
    this.loader = true;
    this._api.getApi('/followups/' + id).subscribe((res: any) => {
      this.loader = false;
      console.log(res);
      if (res && !res.error) {
        this._api.show('success', res.message)
        // this.followups = res.followups
        this.followups = {
          today: res.followups.today,
          tomorrow: res.followups.tomorrow,
          dayAfter: res.followups.dayAfterTomorrow
        };
        console.log(this.followups);
      } else {
        this._api.show('error', res.message)
      }
    });
  }

  tabs = [
    { id: 'today', label: 'Today' },
    { id: 'tomorrow', label: 'Tomorrow' },
    { id: 'dayAfter', label: '+2 Days' }
  ];

  activeTab = 'today';

  getList() {
    return this.followups[this.activeTab];
  }

  call(item: any) {
    item.call_track = item.call_track + 1;
    this._api.putApi('/leads/empTrack/' + item._id, { call_track: item.call_track }).subscribe((res: any) => {
      console.log(res);
      if (res && !res.error) {
        window.location.href = `tel:${item.phone}`
      }
    })
  }

  openWhatsApp(item: any) {
    console.log(item);
    item.whatsapp_track = (item.whatsapp_track || 0) + 1;
    const phone = item.phone;
    const message = encodeURIComponent(
      'Thanks for reaching True Property Consulting. make your dream homes come true'
    );
    const appUrl = `whatsapp://send?phone=${phone}&text=${message}`;
    const webUrl = `https://wa.me/${phone}?text=${message}`;
    this._api.putApi(
      `/leads/empTrack/${item._id}`,
      { whatsapp_track: item.whatsapp_track }
    ).subscribe((res: any) => {
      console.log(res);
      if (res && !res.error) {
        window.location.href = appUrl;
        setTimeout(() => {
          window.location.href = webUrl;
        }, 700);
      }
    }, (err) => {
      console.error(err);
      window.location.href = appUrl;
      setTimeout(() => {
        window.location.href = webUrl;
      }, 700);
    });
  }

  markComplete(item: any) {
    this.lastAction = { item, oldStatus: item.status };
    // item.status = "completed";
    this.swipedItem = item.name;
    this.swipeDirection = 'right';
    if (navigator.vibrate) navigator.vibrate(30);

    setTimeout(() => {
      this.showUndo = true;
      this.swipeDirection = null;
    }, 100);

    setTimeout(() => {
      this.swipedItem = null;
    }, 400);
  }

  undo() {
    if (!this.lastAction) return;
    this.lastAction.item.status = this.lastAction.oldStatus;
    this.lastAction = null;
    this.showUndo = false;
  }

  openDetails(item: any) {
    if (navigator.vibrate) navigator.vibrate([15, 30]);
    this.lastAction = { item, oldStatus: item.status };
    this.swipeDirection = 'left';
    //  item.status = "completed";
    this.swipedItem = item.name;
    setTimeout(() => {
      this.swipeDirection = null;
      this.showUndo = true;
    }, 100);

    setTimeout(() => {
      this.swipedItem = null;
    }, 400);
    this.router.navigate(["/leads"]);
  }

}
