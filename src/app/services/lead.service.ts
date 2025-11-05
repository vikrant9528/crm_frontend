import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lead } from '../models/lead.model';
import { v4 as uuidv4 } from 'uuid';


@Injectable({ providedIn: 'root' })
export class LeadService {
private leads$ = new BehaviorSubject<Lead[]>([]);




add(lead: Lead) {
  const l: Lead = { ...lead, id: uuidv4(), createdAt: new Date().toISOString() };
  this.leads$.next([l, ...this.leads$.value]);
}


getAll(): Observable<Lead[]> { return this.leads$.asObservable(); }


update(id: string, patch: Partial<Lead>) {
const list = this.leads$.value.map(x => x.id === id ? { ...x, ...patch } : x);
this.leads$.next(list);
}


findById(id: string) {
return this.leads$.value.find(l => l.id === id) || null;
}
}