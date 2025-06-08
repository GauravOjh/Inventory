import { Component,signal, OnInit, ViewChild, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ServicesService } from '../app/data/services/services.service';
import { MatButtonModule } from '@angular/material/button';
import { AddInventoryItem, InventoryItemModel } from '../app/data/schema/inventory-add-request-model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from '../app/data/shared/popup/popup/popup.component';
@Component({
  selector: 'app-inventory',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule,FormsModule,ReactiveFormsModule, MatButtonModule,MatTableModule, MatPaginatorModule,MatSortModule,MatCardModule,MatIconModule,MatDialogModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent implements OnInit,AfterViewInit { 
  public formGroup !: FormGroup;
  constructor(public formBuilder:FormBuilder,private service:ServicesService,private dialog:MatDialog){

  }
  displayedColumns: string[] = ['productid', 'productname', 'availablequantity', 'reorderamount','action'];
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  dataSource = new MatTableDataSource<AddInventoryItem>();
  private _liveAnnouncer = inject(LiveAnnouncer);

  createForm(){
    this.formGroup = this.formBuilder.group({
      productid:[0],
      productname : [''],
      AvailableQuantity : [0],
      ReOrderAmount:[0]
    }) 
  }
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  ngOnInit(): void {
    this.createForm();
    this.GetAll();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterCheck(data:Event){
      const value = (data.target as HTMLInputElement).value;
      this.dataSource.filter = value;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  GetAll(){
    this.service.GetAll().subscribe(response=>{
      if(response.success){
        this.dataSource.data = response.data as AddInventoryItem[];
      }
    })
  }

  onSubmit(){
    if(this.formGroup.invalid){
      alert('fill values to continue');
      return;
    }
    let body : any = this.formGroup.value;
    this.service.AddInventoryItem(body).subscribe(
      {
      next:  (response) => {
        if (response?.success)
        {
            alert('Data saved successfully');
            
            this.formGroup.reset({
                productid:null,
                productname : '',
                AvailableQuantity : null,
                ReOrderAmount:null
            })
        } 
        else {
            this.formGroup.reset({
                productid:null,
                productname : '',
                AvailableQuantity : null,
                ReOrderAmount:null
            })
        alert('Save failed: ' + JSON.stringify(response));
      }
    },
    error: (err) => {                                    // <-- will fire now
      console.error('[Inventory] API error', err);
      alert(`API call failed: ${err.message || err.statusText}`);
    },
    complete: () => console.log('[Inventory] request completed')
    });    
  }

  OpenPop(id:any,title:any){
    this.dialog.open(PopupComponent,{
      width:'50%',
      height:'300px',
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      data:{
        title:title,
        id:id
      }
    })
  }

  EditCustomer(id:any){
    this.OpenPop(id,'Edit Users');
  }
}
