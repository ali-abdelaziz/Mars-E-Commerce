import { Component, OnInit } from '@angular/core';
// import { find } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {

  products: any[] = []
  categories: any[] = []
  loading: boolean = false
  cartProducts: any [] = []
  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
  }

  getProducts () {
    this.loading = true
    this.service.getAllProducts().subscribe((res: any) => {
      this.products = res
      this.loading = false

      // console.log(res)

    }, error => {
      this.loading = false
      alert(error)
    })
  }

  getCategories () {
    this.loading = true
    this.service.getAllCategories().subscribe((res: any) => {
      this.categories = res
      this.loading = false

      // console.log(res)

    }, error => {
      this.loading = false
      alert(error)
    })
  }

  filterCategory(event: any) {
    let value = event.target.value;
    (value == "all") ? this.getProducts() : this.getProductsCategory(value)
    // below is the same condition

    // if (value == "all") {
    //   this.getProducts()
    // }else {
    //   this.getProductsCategory(value)
    // }

    // console.log(value)
  }

  getProductsCategory(keyword: string) {
    this.loading = true
    this.service.getProductsByCategory(keyword).subscribe((res: any) => {
      this.products = res
      this.loading = false
    })
  }

  addToCart(event: any) {
    // JSON.stringify()  //send data as it is
    // JSON.parse()  //receive data as it is
    console.log(event)

    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartProducts.find(item => item.item.id == event.item.id)
      if(exist) {
        alert("Product is alredy in your cart")
      } else {
        this.cartProducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartProducts))
      }

      } else {
      this.cartProducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    }


  }

}
