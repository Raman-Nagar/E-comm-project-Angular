import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products:undefined|Iproduct[];
  trandyProducts:undefined|Iproduct[];
  constructor(private product:ProductService){}

	// images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  ngOnInit(): void {
    this.product.popularProducts().subscribe((res)=>{
      this.products = res;
    })
    this.product.trandyProducts().subscribe((res)=>{
      this.trandyProducts = res;
    })
  }
}
