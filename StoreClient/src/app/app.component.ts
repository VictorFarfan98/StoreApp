import { Component } from '@angular/core';
import { ProductService } from './core/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StoreClient';

  constructor(private productService: ProductService){

  }

  ngOnInit(): void{
    console.log("App started")
    this.productService.getProducts(1, 5, true).subscribe(res =>{
      console.log("Get Products");
      
      console.log(res)
    })
  }
}
