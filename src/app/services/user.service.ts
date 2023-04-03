import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IlogIN, IsignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUser = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: IsignUp) {
    this.http.post(`http://localhost:3000/users`, user, { observe: 'response' }).subscribe((res) => {
      localStorage.setItem("user", JSON.stringify(res.body))
      this.router.navigate(["/"])
    })
  }
  userLogin(user: IlogIN) {
    this.http.get<IsignUp[]>(`http://localhost:3000/users?email=${user.email}&password=${user.password}`, { observe: "response" }).subscribe((res) => {
      if (res && res.body?.length) {
        this.invalidUser.emit(false)
        localStorage.setItem("user", JSON.stringify(res.body[0]))
        this.router.navigate(["/"])
      } else {
        this.invalidUser.emit(true)
      }
    })
  }
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/'])
    }
  }
}
