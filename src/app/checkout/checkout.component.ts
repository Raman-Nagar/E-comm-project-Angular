import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Icart, Iorder } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private product: ProductService, private router: Router) { }

  totalPrice: number | undefined;
  cartData: Icart[] | undefined;
  orderMessage: string = "";

  ngOnInit(): void {
    this.product.currentCart().subscribe((res) => {
      let price = 0;
      this.cartData = res;
      res.forEach((item) => {
        if (item.quantity) {
          price += (+item.price * +item.quantity);
        }
      })
      this.totalPrice = price + (price / 10) + 50 - (price / 10);
    })
  }

  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id
    if (this.totalPrice) {
      let orderData: Iorder = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          if (item.id) {
            this.product.deleteCartItems(item.id)
          }
        }, 700)
      })
      this.product.orderNow(orderData).subscribe((res) => {
        if (res) {
          this.orderMessage = "your order has been placed";
          setTimeout(() => {
            this.router.navigate(['/my-orders'])
            this.orderMessage = "";
          }, 1000)
        }
      })
    }
  }
}
