import { CartItem } from "./cart-item";

export interface Cart {
  id: string,
  customer_id: string,
  items: CartItem[],
  total_price: number,

}
