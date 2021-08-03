import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = "http://localhost:5001/api/v1/Products";

  constructor(private http: HttpClient) { }

  getProducts(pageNumber: number, pageSize: number, sort: boolean, searchtext?: string): Observable<any> {
    let params = searchtext ? 
                    `pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&searchtext=${searchtext}`
                    :
                    `pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`
    let url = `${this.baseUrl}?${params}`
    return this.http.get(url);            
  }
}
