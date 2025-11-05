import { Component, HostListener, Input } from '@angular/core';
interface listItem {
  name: string,
  link: string
}
@Component({
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
  listItem: listItem[] = [{ name: 'Add Lead', link: '/leads/add' }, { name: 'Lead List', link: '/leads' }, { name: 'Dashboard', link: '/' }, { name: 'FollowUps', link: '/followups' }];

  toggleMenu() {
    this.menuOpen = !this.menuOpen;

  }

  constructor() {
    console.log(this.show);
  }
}
