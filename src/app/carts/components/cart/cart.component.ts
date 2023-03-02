import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  constructor(private service: CartsService) {}
  cartProducts: any [] = [];
  total: any = 0
  success: boolean = false

  ngOnInit(): void{
    this.getCartProducts()
  }

  getCartProducts() {
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
    }
    this.getCartTotal()
    // console.log(this.cartProducts)
  }

  plusQuantity(index: number) {
    this.cartProducts[index].quantity++
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    this.getCartTotal()
  }

  minusQuantity(index: number) {
    this.cartProducts[index].quantity--
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    this.getCartTotal()
  }

  detectChange() {
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    this.getCartTotal()
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    this.getCartTotal()
  }

  clearCart() {
    this.cartProducts = []
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    this.getCartTotal()
  }

  getCartTotal() {
    this.total = 0
    for(let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  addCart() {
    let products = this.cartProducts.map(item => {
      return {productId: item.item.id, quantity: item.quantity}
    })
    let Model = {
      userId: 5,
      date: new Date(),
      products: products
    }

    this.service.createNewCart(Model).subscribe(res => {
      this.success = true
    })
    console.log(Model)
  }

}
