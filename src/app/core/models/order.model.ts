export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  franchiseId: string;
  franchiseName: string;
  date: any;
  items: OrderItem[];
  totalPrice: number;
  status: 'en_attente' | 'validée' | 'livrée';
  warehouseId: string;
  warehouseName: string;
}
