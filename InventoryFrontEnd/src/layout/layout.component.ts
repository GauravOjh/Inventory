import { CommonModule } from '@angular/common';
import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
 import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-layout',
  imports: [CommonModule,MatToolbarModule, MatButtonModule, MatIconModule,MatFormFieldModule ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
