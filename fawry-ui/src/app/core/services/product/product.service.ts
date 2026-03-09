import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Product } from '../../interfaces/product';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {
  constructor(private _HttpClient: HttpClient) {
    super(_HttpClient, 'product');
  }
}
