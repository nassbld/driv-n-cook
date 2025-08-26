export interface Product {
  id: string;
  name: string;
  category: 'ingrédients' | 'plats préparés' | 'boissons';
  price: number;
}
