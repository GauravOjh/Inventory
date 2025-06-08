export interface AddInventoryItem {
  productid: number;
  productname: string;
  availablequantity: number;
  reorderamount: number;
}

export class InventoryItemModel implements AddInventoryItem {
  productid = 0;
  productname = '';
  availablequantity = 0;
  reorderamount = 0;

  constructor(init?: Partial<AddInventoryItem>) {
    Object.assign(this, init);
  }
}