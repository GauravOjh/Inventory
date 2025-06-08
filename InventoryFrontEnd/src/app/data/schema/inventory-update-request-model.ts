export interface UpdateInventoryItem {
  productname: string;
  availablequantity: number;
  reorderamount: number;
}

export class UpdateInventoryItemModel implements UpdateInventoryItem {
  productname = '';
  availablequantity = 0;
  reorderamount = 0;

  constructor(init?: Partial<UpdateInventoryItem>) {
    Object.assign(this, init);
  }
}