import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  getAllProducts() {

    return this.http.get('https://fakestoreapi.com/products')
    // return this.http.get(environment.baseApi +'products')
  }

  getAllCategories() {
    return this.http.get('https://fakestoreapi.com/products/categories')
    // return this.http.get(environment.baseApi +'products/categories')
  }

  getProductsByCategory(keyword: string) {
    return this.http.get('https://fakestoreapi.com/products/category/' + keyword)
    // return this.http.get(environment.baseApi +'products/category/' +keyword)
  }

  getProductById(id: any) {
    return this.http.get('https://fakestoreapi.com/products/'+id)
    // return this.http.get(environment.baseApi +'products/'+id)
  }


}
