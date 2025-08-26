export interface InventoryItem {
  id: string; // L'ID sera une combinaison de warehouseId et productId
  warehouseId: string;
  productId: string;
  productName: string;
  stock: number;
}
