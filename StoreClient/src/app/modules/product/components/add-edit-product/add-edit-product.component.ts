import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Input() product: Product;
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();

  name = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);  
  stock = new FormControl('', [Validators.required]);  

  constructor(private productService: ProductService, private snackbar: SnackbarService,) { }

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
    console.log("Save");
    
    if (!this.name.invalid && !this.price.invalid && !this.stock.invalid){

      if (this.isEdit) {
        this.productService.updateProduct(this.product.productId, this.name.value, this.price.value, this.stock.value).subscribe(res => {
          console.log(res);
          if (res.succees) {
            this.name.setValue("");
            this.price.setValue("");
            this.stock.setValue("");
            this.onSuccess.emit(true);
          }
        }, error => {
          this.onSuccess.emit(false);
        })
      } else {
        console.log("Create");
      
        this.productService.createProduct(this.name.value, this.price.value, this.stock.value).subscribe(res => {
          console.log(res);
          if (res.succees) {
            this.name.setValue("");
            this.price.setValue("");
            this.stock.setValue("");
            this.onSuccess.emit(true);
          }
        }, error => {
          this.onSuccess.emit(false);
        })
      }
      
    }
    
  }
}
