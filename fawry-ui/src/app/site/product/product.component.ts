import { CartItemService } from './../../core/services/cartItem/cart-item.service';
import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { ProductService } from '../../core/services/product/product.service';
import { Product } from '../../core/interfaces/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products = signal<Product[]>([]);
  quantities: { [key: string]: number } = {};
  quantityError: { [key: string]: string } = {};
  constructor(
    private _ProductService: ProductService,
    private _DestroyRef: DestroyRef,
    private _ToastService: ToastService,
    private _Router: Router,
    private _CartItemService: CartItemService
  ) { }

  ngOnInit(): void {
    this._ProductService.getAll().subscribe({
      next: (res: any) => {
        this.products.set(res.data);
        res.data.forEach((product: Product) => {
          this.quantities[product.id] = 1;
        });
      }
    });
  }
  addProductToCart(productId: string, availableQuantity: number): void {
    const qty = this.quantities[productId] ?? 1;
    if (qty < 1) {
      this.quantityError[productId] = 'Quantity must be at least 1.';
      return;
    }
    if (qty > availableQuantity) {
      this.quantityError[productId] = `Only ${availableQuantity} available.`;
      return;
    }
    this.quantityError[productId] = '';
    const customerId = localStorage.getItem('customer');
    if (!customerId) {
      this._ToastService.error('Please login first.');
      return;
    }
    const cartItem = {
      product_id: productId,
      quantity: qty,
      customer_id: customerId
    };
    this._CartItemService.addProduct(cartItem as any).subscribe({
      next: (res) => {
        this._ToastService.success('Product Added To Cart');
        this.quantities[productId] = 1;
        setTimeout(() => {
          this._Router.navigateByUrl('/cart');
        }, 500);
      },
      error: (err) => {
        console.error('Failed to add product:', err);
        this._ToastService.error('Failed to add product to cart');
      }
    });
  }

}
