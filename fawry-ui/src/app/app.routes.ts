import { Routes } from '@angular/router';
import { LayoutComponent } from './site/shared/layout/layout.component';
import { customerGuard } from './core/guards/customer.guard';
import { CustomerLoginComponent } from './site/shared/customer-login/customer-login.component';
export const routes: Routes = [
  { path: 'customer-login', component: CustomerLoginComponent },
  {
    path: '',
    canActivate: [customerGuard],
    component: LayoutComponent,
    title: 'Fawry E-commerce',
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        loadComponent: () =>
          import('./site/product/product.component').then(m => m.ProductComponent),
        title: 'Products',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./site/cart/cart.component').then(m => m.CartComponent),
        title: 'Cart',
      },
      {
        path: 'order',
        loadComponent: () =>
          import('./site/order/order.component').then(m => m.OrderComponent),
        title: 'Orders',
      },
      // ممكن تضيف كمان cart, checkout هنا
    ],
  },
];
