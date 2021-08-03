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

  /**
   * Logic to be executed after component is initialized.
   */
  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.page.subscribe(() => {
      this.loadData();  
    })

    //? Run this outside of the paginator.page.subscribe for initial data retrieval.
    this.loadData();    
  }

  /**
   * Apply the text based filter and reload data.
   */
  applyFilter(){
    this.loadData();
  }

  /**
   * Enables or disables sorting and reloads data.
   */
  sortChanged(){
    this.loadData();
  }

  /**
   * Open the edit product section
   * 
   * @param product The product to be edited.
   */
  editProduct(product: Product): void {
    this.showEditProduct = false;
    this.selectedProduct = product;
    this.showEditProduct = true;
  }
  
  /**
   * Execute the buy action of a product
   * 
   * @param productId The Id of the product to be bought.
   */
  buyProduct(productId: number){
    this.productService.buyProduct(productId).subscribe(res => {
      if(res.succees) {
        this.snackbar.openSnackBar("Product bought successfully", "Dismiss");
        this.loadData();
      }
    }, error => {
      if (error.status === 401) {
        this.snackbar.openSnackBar("Unauthorized!!! Please login to use this feature", "Dismiss");
      }
      
    })
  }

  /**
   * Delete a product.
   * 
   * @param productId The Id of the product to be deleted.
   */
  deleteProduct(productId: number){
    this.productService.deleteProduct(productId).subscribe(res => {
      if(res.succees) {
        this.snackbar.openSnackBar("Product deleted successfully", "Dismiss");
        this.loadData();
      }
    }, error => {
      if (error.status === 401) {
        this.snackbar.openSnackBar("Unauthorized!!! Please login to use this feature", "Dismiss");
      }
      
    })
  }

  /**
   * Logic to be executed when a product is created or updated.
   */
  handleSaveSuccess(success){
    if (success) {
      this.showAddProduct = false;
      this.showEditProduct = false;
      this.snackbar.openSnackBar("Product saved successfully", "Dismiss");
      this.loadData();
    } else {
      this.showAddProduct = false;
      this.showEditProduct = false;
      this.snackbar.openSnackBar("Unauthorized!!! Please login to use this feature", "Dismiss");
    }
  }

  /**
   * Load the list of products.
   */
  loadData(): void {
    this.productService.getProducts(this.paginator.pageIndex+1, this.paginator.pageSize, this.sortAPI, this.searchtext).subscribe(res =>{
      this.data = res.data;
      this.isLoadingResults = false;
      this.isRateLimitReached = res.data === null;
      this.resultsLength = res.totalRecords;
    })
  }

  /**
   * Login with default credentials. 
   */
  login(): void{
    this.authService.SignIn();
    if (this.authService.authToken != null) {
      this.snackbar.openSnackBar("Successfully Logged In", "Dismiss");
    } else {
      this.snackbar.openSnackBar("There was an error when logging in.", "Dismiss");
    }
    
  }

  /**
   * Logout of the application
   */
  logout(): void{
    this.authService.SignOut();
    if (!this.authService.authToken) {
      this.snackbar.openSnackBar("Successfully Logged Out", "Dismiss");
    } else {
      this.snackbar.openSnackBar("There was an error when logging out.", "Dismiss");
    }
  }
}
