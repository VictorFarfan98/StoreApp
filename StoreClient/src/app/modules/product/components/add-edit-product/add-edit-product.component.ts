import { Component, Input, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  @Input() isEdit: boolean;
  @Input() product: Product;

  name = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);  
  stock = new FormControl('', [Validators.required]);  

  constructor() { }

  ngOnInit(): void {
    //this.name.setValue("Hola");
    if (this.isEdit) {
      this.name.setValue(this.product.name)
      this.price.setValue(this.product.price)
      this.stock.setValue(this.product.stock)
    }
    
  }

  saveProduct(): void{
    //console.log(this.name.invalid);
  }
}
