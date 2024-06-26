import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NamedObservableService {
  private namedObservables: { [name: string]: BehaviorSubject<any> } = {};
  private dataSubjects: { [key: string]: Subject<any> } = {};

  constructor() { }

  // Register a named observable
  register(name: string): void {
    if (!this.namedObservables[name]) {
      this.namedObservables[name] = new BehaviorSubject<any>(null);
    }
  }

  // Get a named observable
  getObservable(name: string): Observable<any> {
    if (!this.dataSubjects[name]) {
      this.dataSubjects[name] = new Subject<any>();
      }
    return this.dataSubjects[name].asObservable();
  }

  // Update a named observable value
  updateValue(name: string, value: any): void {
    if (!this.dataSubjects[name]) {
      this.dataSubjects[name] = new Subject<any>();
    }
    this.dataSubjects[name].next(value);
  }

  // Clear all named observables
  clearAll(): void {
    Object.keys(this.namedObservables).forEach(key => {
      this.namedObservables[key].complete();
    });
    this.namedObservables = {};
    console.log("🚀 ~ NamedObservableService ~ clearAll ~ this.namedObservables:", this.namedObservables)

    Object.keys(this.dataSubjects).forEach(key => {
      this.dataSubjects[key].complete();
    });
    this.dataSubjects = {};
    console.log("🚀 ~ NamedObservableService ~ clearAll ~ this.dataSubjects:", this.dataSubjects)
  }

  ///////////////// new /////////////////////////

  setData(key: string, data: any): void {
    if (!this.dataSubjects[key]) {
      this.dataSubjects[key] = new Subject<any>();
    }
    this.dataSubjects[key].next(data);
  }
  getData(key: string): Observable<any> {
    if (!this.dataSubjects[key]) {
      this.dataSubjects[key] = new Subject<any>();
    }
    return this.dataSubjects[key].asObservable();
  }
}
