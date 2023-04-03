import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Icart, IpriceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  constructor(private product: ProductService, private router: Router) { }

  cartData: Icart[] | undefined;
  priceSummary: IpriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };

  getCartDetails() {
    this.product.currentCart().subscribe((res) => {
      this.cartData = res;
      let price = 0;
      res.forEach((item) => {
        if (item.quantity) {
          price += (+item.price * +item.quantity);
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 40;
      this.priceSummary.total = this.priceSummary.price - this.priceSummary.discount + this.priceSummary.tax + this.priceSummary.delivery;
      if (!this.cartData.length) {
        this.router.navigate(['/'])
      }
    })
  }

  ngOnInit(): void {
    this.getCartDetails();
  }

  checkOut() {
    this.router.navigate(['/checkout'])
  }

  removeToCart(cartId: number | undefined) {
    cartId && this.cartData && this.product.removeFromCart(cartId).subscribe((res) => {
      if (res) {
        this.getCartDetails();
      }
    })
  }

}
