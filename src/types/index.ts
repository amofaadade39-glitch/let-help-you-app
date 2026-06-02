export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Summer' | 'Accessories' | 'Footwear' | 'Lifestyle';
  image: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}