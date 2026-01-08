export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  farmerId: string;
  farmerName: string;
  image: string;
  description: string;
  stock: number;
  location: string;
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  specialties: string[];
  rating: number;
  totalReviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
