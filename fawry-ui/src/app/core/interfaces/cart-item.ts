import { Product } from "./product";

export interface CartItem {
  id: string,
  product_id: string,
  customer_id: string,
  quantity: number,
  cart_id: string,
  product: Product
}
