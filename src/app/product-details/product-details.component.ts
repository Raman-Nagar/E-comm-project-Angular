import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Icart, Iproduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData: undefined | Iproduct;
  productQty: number = 1;
  removeCart: boolean = false;
  cartData: Iproduct | undefined;

  constructor(private activeRout: ActivatedRoute, private product: ProductService) { }
  ngOnInit(): void {
    let query = this.activeRout.snapshot.paramMap.get('details');
    query && this.product.getProduct(query).subscribe((res) => {
      this.productData = res;

      let cartData = localStorage.getItem('localCart')
      if (query && cartData) {
        let items = JSON.parse(cartData)
        items = items.filter((cartItem: Iproduct) => {
          return query == cartItem.id.toString();
        })
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((res) => {
          if (res) {
            let item = res.filter((item: Iproduct) => {
              return query?.toString() === item.productId?.toString()
            })
            if (item.length) {
              this.cartData = item[0]
              this.removeCart = true;
            }
          }
        })
      }
    })
  }
  handleQuantity(val: string) {
    if (this.productQty < 20 && val === "plus") {
      this.productQty += 1;
    } else if (this.productQty > 1 && val === "min") {
      this.productQty -= 1;
    }
  }

  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQty;
      if (!localStorage.getItem("user")) {
        this.product.localAddToCart(this.productData)
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: Icart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }
        delete cartData.id;

        this.product.addCart(cartData).subscribe((res) => {
          if (res) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }
  removeToCart(productId: number) {
    if (!localStorage.getItem("user")) {
      this.product.removeItemToCart(productId)
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartData && this.product.removeFromCart(this.cartData.id).subscribe((res) => {
        if (res) {
          this.product.getCartList(userId)
        }
      })
      this.removeCart = false;
    }
  }

}
