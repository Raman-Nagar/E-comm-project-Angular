import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsignUp } from '../data-type';
import { SellarService } from '../services/sellar.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})

export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellarService, private router: Router) { }

  showLogin = false;
  authError: string = "";

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  toggleLink() {
    this.showLogin = !this.showLogin;
  }
  SignUp(data: IsignUp): void {
    this.seller.userSignUp(data)
  }
  logIn(data: IsignUp): void {
    this.authError ="";
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Invalid credencials"
      }
    })
  }
}
