export interface Product {
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
}

export interface Cart {
  id: any | undefined;
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
