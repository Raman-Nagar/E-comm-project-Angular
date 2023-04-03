import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Iorder } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  constructor(private product: ProductService) { }

  orderData: Iorder[] | undefined;

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined) {
    orderId && this.product.cancelOrder(orderId).subscribe((res) => {
      if (res) {
        this.getOrderList();
      }
    })
  }

  getOrderList() {
    this.product.orderList().subscribe((res) => {
      this.orderData = res;
    })
  }
}
