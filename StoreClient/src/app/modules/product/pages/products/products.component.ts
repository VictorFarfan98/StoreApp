import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  searchtext: string = "";
  products: Product[] = [];
  sortAPI: boolean = true;
  // Table related data
  displayedColumns: string[] = ['productId', 'name', 'price', 'stock', 'actionButton'];
  data: Product[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.page.subscribe(() => {
      this.productService.getProducts(this.paginator.pageIndex+1, this.paginator.pageSize, this.sortAPI).subscribe(res =>{
        this.data = res.data;
        this.isLoadingResults = false;
        this.isRateLimitReached = res.data === null;
        this.resultsLength = res.totalRecords;
      })  
    })

    //? Run this outside of the paginator.page.subscribe for initial data retrieval.
    this.productService.getProducts(this.paginator.pageIndex, this.paginator.pageSize, this.sortAPI).subscribe(res =>{
      this.data = res.data;
      this.isLoadingResults = false;
      this.isRateLimitReached = res.data === null;
      this.resultsLength = res.totalRecords;
    })    
  }

  applyFilter(){
    this.productService.getProducts(this.paginator.pageIndex, this.paginator.pageSize, this.sortAPI, this.searchtext).subscribe(res =>{
      console.log(res.data);
      
      this.data = res.data;
      this.isLoadingResults = false;
      this.isRateLimitReached = res.data === null;
      this.resultsLength = res.totalRecords;
    })
  }

  sortChanged(){
    console.log(this.sortAPI);
    
    this.productService.getProducts(this.paginator.pageIndex, this.paginator.pageSize, this.sortAPI, this.searchtext).subscribe(res =>{
      console.log(res.data);
      
      this.data = res.data;
      this.isLoadingResults = false;
      this.isRateLimitReached = res.data === null;
      this.resultsLength = res.totalRecords;
    })
  }
  
  buyProduct(productId: number){
    console.log("Buy product: " + productId);
    //TODO: Call buy method
  }
}
