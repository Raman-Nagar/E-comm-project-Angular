import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IlogIN, IsignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellarService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: IsignUp) {
    this.http.post('http://localhost:3000/seller', data, { observe: "response" }).subscribe((res) => {
      localStorage.setItem("seller", JSON.stringify(res.body))
      this.router.navigate(['seller-home'])
    })
  }
  reloadSeller() {
    if (localStorage.getItem("seller")) {
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(data: IlogIN) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: "response" }).subscribe((res: any) => {
      if (res && res.body && res.body.length) {
        localStorage.setItem("seller", JSON.stringify(res.body))
        this.router.navigate(['seller-home'])
      } else {
        this.isLoginError.emit(true)
      }
    })
  }
}
