import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private product: ProductService) { }

  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | Iproduct[];
  userName: string = '';
  cartItem = 10;

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = "seller";
          let sellerData = localStorage.getItem('seller');
          this.sellerName = sellerData && JSON.parse(sellerData)[0].name;

        } else if (localStorage.getItem('user')) {

          this.menuType = "user";
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name

          this.product.getCartList(userData.id)

        } else {
          this.menuType = "default"
        }
      }
    })
    let cartData = localStorage.getItem("localCart")
    if (cartData) {
      this.cartItem = JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((item) => {
      this.cartItem = item.length;
    })
  }

  logOut() {
    localStorage.removeItem('seller')
    this.router.navigate(['/'])
  }

  userLogOut() {
    localStorage.removeItem('user')
    this.router.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }
  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((res) => {
        this.searchResult = res;
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(val: string) {
    this.router.navigate([`/search/${val}`])
  }
  redirectDetails(id: number) {
    this.router.navigate([`/product-details/${id}`])
  }
}
