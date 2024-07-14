export interface Product {
  id: number;
  name: string;
  price: string;
  order_id: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface Order {
  id: number;
  name: string;
  description: string;
  date: string;
  created_at: string | null;
  updated_at: string | null;
  products: Product[];
}
