import { Component } from '@angular/core';
import { Iproduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  constructor(private product: ProductService) { }

  addProduct(data: Iproduct) {
    this.product.addProductData(data).subscribe((res) => {
      if(res){
         this.addProductMessage = "Product is successfully added"
      }
      setTimeout(()=>{
        this.addProductMessage=undefined;
      }, 2000)
    })
  }
}
