import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ServicesService } from '../../../services/services.service';
import { UpdateInventoryItemModel } from '../../../schema/inventory-update-request-model';

@Component({
  selector: 'app-popup',
  imports: [MatDialogModule,MatFormFieldModule, MatInputModule, MatSelectModule,FormsModule,ReactiveFormsModule, MatButtonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit {
inputData:any;
public formGroup!:FormGroup;
editData:any;
  UpdateItem!: UpdateInventoryItemModel;
constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref:MatDialogRef<PopupComponent>,private formBuilder:FormBuilder,private service:ServicesService){}
  CreateForm(){
    this.formGroup = this.formBuilder.group({
      productname : [''],
      AvailableQuantity : [0],
      ReOrderAmount:[0]
    })
  }
  ngOnInit(): void {
    this.inputData=this.data;
    this.CreateForm();
    if(this.inputData.id>0){
      this.GetByProductId(this.inputData.id);
    }
  }

  GetByProductId(product:any){
    this.service.GetByProductId(product).subscribe(response=>{
      this.editData=response.data;
      this.formGroup.setValue({productname:this.editData.productname, AvailableQuantity:this.editData.availableQuantity,ReOrderAmount:this.editData.reOrderAmount})
    });
  }
  Update(){
    const updateData = this.formGroup.value;
    if(updateData.invalid){
      alert('Fill Values');
      return;
    }
    this.service.UpdateByProductId(this.inputData.id,updateData).subscribe(response=>{
      if(response.success){
        this.ref.close();
        this.formGroup.reset({
                productid:null,
                productname : '',
                AvailableQuantity : null,
                ReOrderAmount:null
        });
        alert('Data Updated Successfully');
      }
    });
  }
  Close(){
    this.ref.close();
  }
}
