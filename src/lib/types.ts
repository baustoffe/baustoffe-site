export interface CartItem {
  variant_id: string;
  product_id: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  unit_price_ron: number;
  image?: string;
}
