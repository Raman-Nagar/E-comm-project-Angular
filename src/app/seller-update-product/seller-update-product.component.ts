import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productData: undefined | Iproduct;
  updateProductMessage: string = "";

  constructor(private rout: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.rout.snapshot.paramMap.get('id')
    productId && this.product.getProduct(productId).subscribe((data) => {
      this.productData = data;
    })
  }

  updateProduct(data: Iproduct) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.UpdateProduct(data).subscribe((res) => {
      if (res) {
        this.updateProductMessage = "Product Updated Successfully"
      }
      setTimeout(() => {
        this.updateProductMessage = "";
      }, 2000)
    })
  }
}
