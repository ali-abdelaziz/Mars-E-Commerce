import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }

  createNewCart(model: any) {
    // return this.http.post(environment.baseApi + 'carts', model)
    return this.http.get('https://fakestoreapi.com/carts')   // from Add new cart "fakestoreapi"
  }
}
