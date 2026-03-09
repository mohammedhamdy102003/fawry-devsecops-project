import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Customer } from '../../interfaces/customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<Customer> {

  constructor(private _HttpClient: HttpClient) {
    super(_HttpClient, 'customer');
  }
}
