import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icart, IlogIN, Iproduct, IsignUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  constructor(private user: UserService, private router: Router, private product: ProductService) { }
  authError: string = "";
  showLogin = false;

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  toggleLink() {
    this.showLogin = !this.showLogin;
  }
  SignUp(data: IsignUp) {
    this.user.userSignUp(data)
  }
  logIn(data: IlogIN) {
    this.authError = "";
    this.user.userLogin(data)
    this.user.invalidUser.subscribe((isError) => {
      if (isError) {
        this.authError = "Invalid credencials"
      } else {
        this.localCartToRemoteCart();
      }
    })
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem("user");
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: Iproduct[] = JSON.parse(data)

      cartDataList.forEach((product: Iproduct, index: number) => {
        let cartData: Icart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {

          this.product.addCart(cartData).subscribe((res) => {
            if (res) {
              // console.log(res)
            }
          })
        }, 500)
        if (cartDataList.length === (index + 1)) {
          localStorage.removeItem("localCart")
        }
      })
    }
    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000)
  }
}
