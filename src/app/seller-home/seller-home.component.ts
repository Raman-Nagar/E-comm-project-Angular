import { Component, OnInit } from '@angular/core';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Iproduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  allProducts: undefined | Iproduct[];
  productMessage: string = "";
  icon = faTrash;
  icon1 = faPenToSquare;
  constructor(private product: ProductService) { }


  pList() {
    this.product.productList().subscribe((res) => {
      this.allProducts = res;
    })
  }
  ngOnInit(): void {
    this.pList()
  }
  deleteProduct(id: number) {
    this.product.DeleteProduct(id).subscribe((res) => {
      if (res) {
        this.productMessage = "Product Deleted Successfully";
        this.pList();
      }
      setTimeout(() => {
        this.productMessage = ""
      }, 2000)
    })
  }
}
