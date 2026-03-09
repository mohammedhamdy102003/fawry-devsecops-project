import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../interfaces/order';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private _HttpClient: HttpClient) {
  }
  cehckout(cutomerId: string): Observable<Order> {
    return this._HttpClient.post<Order>(`${environment.baseUrl}/checkout/${cutomerId}`, cutomerId);
  }
  clearCart(cutomerId: string): Observable<Order> {
    return this._HttpClient.delete<Order>(`${environment.baseUrl}/cart/clear/${cutomerId}`);
  }
  myOrders(cutomerId: string): Observable<Order> {
    return this._HttpClient.get<Order>(`${environment.baseUrl}/my-orders/${cutomerId}`);
  }
}
