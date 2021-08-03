import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { FirebaseAuthService } from 'src/app/core/auth';
import { ProductService } from 'src/app/core/services/product.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
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
  showAddProduct: boolean = false;
  showEditProduct: boolean = false;
  selectedProduct: Product = null;
  // Table related data
  displayedColumns: string[] = ['productId', 'name', 'price', 'stock', 'actionButton'];
  data: Product[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService,
    private snackbar: SnackbarService,
    private authService: FirebaseAuthService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.page.subscribe(() => {
      this.loadData();  
    })

    //? Run this outside of the paginator.page.subscribe for initial data retrieval.
    this.loadData();    
  }

  applyFilter(){
    this.loadData();
  }

  sortChanged(){
    this.loadData();
  }

  editProduct(product: Product): void {
    this.selectedProduct = product;
    this.showEditProduct = true;
  }
  
  buyProduct(productId: number){
    console.log("Buy product: " + productId);
    this.productService.buyProduct(productId).subscribe(res => {
      if(res.succees) {
        this.snackbar.openSnackBar("Product bought successfully", "Dismiss");
        this.loadData();
      }
    })
  }

  deleteProduct(productId: number){
    console.log("Delete product: " + productId);
    this.productService.deleteProduct(productId).subscribe(res => {
      if(res.succees) {
        this.snackbar.openSnackBar("Product deleted successfully", "Dismiss");
        this.loadData();
      }
    })
  }

  handleSaveSuccess(success){
    console.log("Handle save success: " + success);
    
    if (success) {
      this.showAddProduct = false;
      this.showEditProduct = false;
      this.snackbar.openSnackBar("Product saved successfully", "Dismiss");
      this.loadData();
    }    
  }

  loadData(): void {
    this.productService.getProducts(this.paginator.pageIndex+1, this.paginator.pageSize, this.sortAPI, this.searchtext).subscribe(res =>{
      console.log(res.data);
      
      this.data = res.data;
      this.isLoadingResults = false;
      this.isRateLimitReached = res.data === null;
      this.resultsLength = res.totalRecords;
    })
  }

  login(): void{
    console.log("login");
    this.authService.SignIn();
  }

  logout(): void{
    console.log("logout");
    this.authService.SignOut();
  }
}
