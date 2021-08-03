import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) { }

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
    return this.http.get(url);            
  }

  createProduct(name: string, price: number, stock: number): Observable<any> {
    let url = `${this.baseUrl}`;
    let newProduct: any = { 
      "name": name,
      "price": price,
      "stock": stock
    }
    console.log(newProduct);
    
    return this.http.post(url, newProduct);
  }

  updateProduct(productId: number, name: string, price: number, stock: number): Observable<any> {
    let url = `${this.baseUrl}/${productId}`;
    let newProduct: any = { 
      "name": name,
      "price": price,
      "stock": stock
    }
    console.log(newProduct);
    
    return this.http.put(url, newProduct);
  }
}
