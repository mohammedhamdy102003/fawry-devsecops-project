
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService<Cart> {
  constructor(private _HttpClient: HttpClient) {
    super(_HttpClient, 'cart');
  }
}
