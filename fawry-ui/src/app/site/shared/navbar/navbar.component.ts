import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../../core/services/customer/customer.service';
import { Customer } from '../../../core/interfaces/customer';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  id = signal<string>(`${localStorage.getItem('customer')}`)
  customer = signal<Customer>({} as Customer);
  constructor(private _CustomerService: CustomerService, private _CartService: CartService, private _Router: Router, private _DestroyRef: DestroyRef) { }
  ngOnInit(): void {
    const subscription = this._CustomerService.getById(this.id()).subscribe({
      next: (res: any) => {
        this.customer.set(res.data);
      }
    });
    this._DestroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
  getCart() {
    const cart = { customer_id: this.id() }
    this._CartService.create(cart as any).subscribe({
      next: (res) => {
        console.log(res);
        setTimeout(() => {
          this._Router.navigateByUrl('/cart');
        }, 100);
      }
    })
  }
  logout() {
    localStorage.removeItem('customer');
    this._Router.navigateByUrl('/customer-login');
  }
}
