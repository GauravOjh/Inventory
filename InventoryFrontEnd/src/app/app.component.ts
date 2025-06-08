import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "../layout/layout.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { InventoryComponent } from "../inventory/inventory.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from './data/services/services.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutComponent, MatFormFieldModule, InventoryComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InventoryFrontEnd';
  public constructor(public service:ServicesService){}
}
