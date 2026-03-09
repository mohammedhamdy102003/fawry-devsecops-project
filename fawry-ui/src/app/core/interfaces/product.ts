export interface Product {
  id: string,
  name: string,
  price: string,
  quantity: number,
  is_expire: boolean,
  expire_at?: Date,
  is_shippable: boolean,
  weight: string,
  weight_formatted: string,
  created_at: Date
}
