import { Cart } from './cart';
export interface Customer {
  id: string,
  name: string,
  email: string,
  balance: number,
  cart: Cart
}
