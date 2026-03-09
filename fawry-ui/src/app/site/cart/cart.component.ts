import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastService } from '../../core/services/toast/toast.service';
import { Cart } from '../../core/interfaces/cart';
import { CommonModule } from '@angular/common';
import { CartItemService } from '../../core/services/cartItem/cart-item.service';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../core/services/order/order.service';
import { CustomerService } from '../../core/services/customer/customer.service';
import { Customer } from '../../core/interfaces/customer';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart = signal<Cart>({} as Cart)
  customer = signal<Customer>({} as Customer)
  constructor(
    private _CartService: CartService,
    private _CartItemService: CartItemService,
    private _CustomerService: CustomerService,
    private _OrderService: OrderService,
    private _DestroyRef: DestroyRef,
    private _ToastService: ToastService,
  ) { }
  customerId = signal<string>(`${localStorage.getItem('customer')}`);
  ngOnInit(): void {
    this.getCart();
    this.getCustomer();
  }
  getCart() {
    const sub = this._CartService.getById(this.customerId()).subscribe({
      next: (res: any) => {
        this.cart.set(res.data);
      }
    });
    this._DestroyRef.onDestroy(() => {
      sub.unsubscribe();
    })
  }
  getCustomer() {
    const sub = this._CustomerService.getById(this.customerId()).subscribe({
      next: (res: any) => {
        this.customer.set(res.data);
      }
    });
    this._DestroyRef.onDestroy(() => {
      sub.unsubscribe();
    })
  }
  deleteCartItem(id: string) {
    this._CartItemService.deleteProduct(id).subscribe({
      next: () => {
        this._ToastService.success('Product removed from cart');
        this.getCart();
      }
    })

  }
  deleteCart() {
    this._OrderService.clearCart(this.customerId()).subscribe({
      next: (res) => {
        this.getCart();
        this._ToastService.success('Clear Cart Successfully');
      }, error: (err) => {
        this._ToastService.error(err.error.message);
      }
    })
  }
  checkout() {
    this._OrderService.cehckout(this.customerId()).subscribe({
      next: (res) => {
        this.getCart();
        this._ToastService.success('Checkout Successfully')
      }, error: (err) => {
        console.log(err);

        this._ToastService.error(err.error.message);
      }
    })
  }
}
