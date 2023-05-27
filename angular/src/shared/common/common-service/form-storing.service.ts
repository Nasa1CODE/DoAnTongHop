import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormStoringService {

  constructor() {}

  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key) {
    const val = localStorage.getItem(key);
    if (val != "undefined") return JSON.parse(val);
    if(val) return '';
  }

  clear(key) {
    localStorage.removeItem(key);
  }
}
