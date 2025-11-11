import { Component, HostListener, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
interface listItem {
  name: string,
  link: string
}
@Component({
  standalone: false,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    console.log(target);
    if (!target.closest('.temp')) this.menuOpen = false;
  }
  @Input() show: boolean = false;
  fix: boolean = false;
  menuOpen: boolean = false;
  listItem: listItem[] = [{ name: 'Add Lead', link: '/leads/add' }, { name: 'Lead List', link: '/leads' }, { name: 'Dashboard', link: '/leads' }, { name: 'FollowUps', link: '/followups' }, { name: 'Logout', link: '/login' }];
  authData: any;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;

  }
  logout(item:any){
    if(item.name == 'Logout'){
      this._auth.logout();
    }
  }

  constructor(private _auth : AuthService) {
    const authData = localStorage.getItem('authData');
    if (authData) {
      this.authData = JSON.parse(authData);
    }
    console.log(this.show);
  }
}
