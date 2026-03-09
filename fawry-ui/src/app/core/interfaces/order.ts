import { CartItem } from "./cart-item";

export interface Order {
  id: string,
  total_price: number,
  items: CartItem[],
  shipping_fees: number,
  subtotal: number,
  total_paid: number,
  created_at: Date
}
