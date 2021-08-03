import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './pages/products/products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';



@NgModule({
  declarations: [
    ProductsComponent,
    AddEditProductComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
