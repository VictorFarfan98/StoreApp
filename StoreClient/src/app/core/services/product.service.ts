import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from '../auth';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = "http://localhost:5001/api/v1/Products";
  headerDict: any = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  constructor(private http: HttpClient, private authService: FirebaseAuthService) { }

  /**
   * Get the list of products
   * 
   * @param pageNumber The current page number
   * @param pageSize The amount of elements to retrieve
   * @param sort Flag to sort the products list by name
   * @param searchtext The searchtext to look for
   */
  getProducts(pageNumber: number, pageSize: number, sort: boolean, searchtext?: string): Observable<any> {
    let params = searchtext ? 
                    `pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&searchtext=${searchtext}`
                    :
                    `pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`
    let url = `${this.baseUrl}?${params}`
    
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ this.authService.authToken
    });

    const httpOptions = {
      headers: headers_object
    };

    return this.http.get(url, httpOptions);            
  }

  /**
   * Create a new product
   * 
   * @param name  The name of the product
   * @param price The price of the product
   * @param stock The available stock of the product
   * @returns 
   */
  createProduct(name: string, price: number, stock: number): Observable<any> {
    let url = `${this.baseUrl}`;
    let newProduct: any = { 
      "name": name,
      "price": price,
      "stock": stock
    }
    console.log(newProduct);

    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ this.authService.authToken
    });

    const httpOptions = {
      headers: headers_object
    };
    
    return this.http.post(url, newProduct, httpOptions);
  }

  /**
   * Edit an existing product
   * 
   * @param productId The id of the product to edit
   * @param name The new name of the product
   * @param price The new price of the product
   * @param stock The new stock of the product
   */
  updateProduct(productId: number, name: string, price: number, stock: number): Observable<any> {
    let url = `${this.baseUrl}/${productId}`;
    let newProduct: any = { 
      "name": name,
      "price": price,
      "stock": stock
    }
    console.log(newProduct);
    
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ this.authService.authToken
    });

    const httpOptions = {
      headers: headers_object
    };

    return this.http.put(url, newProduct, httpOptions);
  }

  /**
   * Deletes a product from a given id.
   * 
   * @param productId The id of the product to be deleted.
   */
  deleteProduct(productId: number): Observable<any>{
    let url = `${this.baseUrl}/${productId}`;
    
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ this.authService.authToken
    });

    const httpOptions = {
      headers: headers_object
    };

    return this.http.delete(url, httpOptions);
  }

  /**
   * Triggers the buy action of a product.
   * 
   * @param productId The id of the product to buy.
   */
  buyProduct(productId: number): Observable<any>{
    let url = `${this.baseUrl}/${productId}`;
    
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ this.authService.authToken
    });

    const httpOptions = {
      headers: headers_object
    };

    return this.http.patch(url, null, httpOptions);
  }
}
