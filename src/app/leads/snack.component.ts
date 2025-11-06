import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";

@Component({
  selector: 'app-snack',
  template: `
    <div
      *ngIf="toast"
      class="fixed top-4 right-4 px-4 py-3 rounded-lg text-white font-medium 
      transition-opacity duration-300 shadow-lg"
      [ngClass]="{
        'bg-green-600': toast.type === 'success',
        'bg-red-600': toast.type === 'error'
      }"
    >
      {{ toast.msg }}
    </div>
  `
})
export class SnackComponent implements OnInit {
  toast: { type: 'success' | 'error', msg: string } | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.toast$.subscribe(t => {
      this.toast = t;
      setTimeout(() => this.toast = null, 2500); // auto hide
    });
  }
}
