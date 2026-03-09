import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();
  constructor() { }
  showLoader(): void {
    this.isLoadingSubject.next(true);
  }
  hideLoader(): void {
    this.isLoadingSubject.next(false);
  }
  get isLoading(): boolean {
    return this.isLoadingSubject.value;
  }
}