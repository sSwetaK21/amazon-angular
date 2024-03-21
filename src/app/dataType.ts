export interface Product {
  products_id: any | string;
  id: any;
  title: string;
  price: number;
  discountPrice: number;
  category: string;
  color: string[];
  product: any;
  description: string;
  imageUrl: string;
  brand: string;
  size: string[];
  quantity: undefined | number;
  purchaseQuantity: number;
}

export interface Cart {
  id: any;
  title: string;
  price: number;
  discountedPrice: number;
  category: string;
  color: string[];
  description: string;
  imageUrl: string;
  brand: string;
  size: string[];
  quantity: undefined | number;
  userId: number;
  productId: number;
}
