import { CartItem } from './../../interfaces/cart-item';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  constructor(private _HttpClient: HttpClient) {
  }
  addProduct(cartItem: CartItem): Observable<CartItem> {
    return this._HttpClient.post<CartItem>(`${environment.baseUrl}/cart-item`, cartItem);
  }
  deleteProduct(id: string): Observable<CartItem> {
    return this._HttpClient.delete<CartItem>(`${environment.baseUrl}/cart-item/${id}`);
  }
}
