import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddInventoryItem, InventoryItemModel } from '../schema/inventory-add-request-model';
import { Observable } from 'rxjs';
import { UpdateInventoryItemModel } from '../schema/inventory-update-request-model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http:HttpClient) { }
  

  AddInventoryItem(request:InventoryItemModel):Observable<any>{
    return this.http.post<any>('https://localhost:7135/api/Inventory/addinventory',request);
  }

  GetAll(){
    return this.http.get<any>('https://localhost:7135/api/Inventory/getallinventorydata');
  }

  GetByProductId(productId:any){
    return this.http.get<any>('https://localhost:7135/api/Inventory/getinventorydata/'+productId);
  }

  UpdateByProductId(productId:any,body: UpdateInventoryItemModel):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>('https://localhost:7135/api/Inventory/inventorydataupdate/'+productId,body, { headers });
  }

  deleteByProductId(productId:any){
    return this.http.delete<any>('https://localhost:7135/api/Inventory/deleteinventorydata/'+productId);
  }
}
