import { Component, signal } from '@angular/core';
import { CustomerService } from '../../../core/services/customer/customer.service';
import { ToastService } from '../../../core/services/toast/toast.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.css'
})
export class CustomerLoginComponent {
  isLoading = signal<boolean>(false);
  constructor(
    private _CustomerService: CustomerService,
    private _Router: Router,
    private _ToastService: ToastService,
  ) { }

  customerLoginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    balance: new FormControl('', [Validators.required]),
  });

  customerLogin(customerLoginForm: FormGroup) {
    this.isLoading.set(true)
    this._CustomerService.create(customerLoginForm.value).subscribe({
      next: (data: any) => {
        localStorage.setItem('customer', data.data.id)
        this._ToastService.success('Welcome Back ..');
        this._Router.navigateByUrl('/');
      },
      error: (err: any) => {
        this.isLoading.set(false)
        this._ToastService.error('Check Your Email or Password !');
      }, complete: () => {
        this.isLoading.set(false)
      }
    });
  }
}
