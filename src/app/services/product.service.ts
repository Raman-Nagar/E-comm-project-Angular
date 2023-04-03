import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Icart, Iorder, Iproduct } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<Iproduct[] | []>();

  constructor(private http: HttpClient) { }

  addProductData(data: Iproduct) {
    return this.http.post(`http://localhost:3000/products`, data)
  }
  productList() {
    return this.http.get<Iproduct[]>(`http://localhost:3000/products`)
  }
  DeleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProduct(id: string) {
    return this.http.get<Iproduct>(`http://localhost:3000/products/${id}`)
  }
  UpdateProduct(product: Iproduct) {
    return this.http.put<Iproduct>(`http://localhost:3000/products/${product.id}`, product)
  }
  popularProducts() {
    return this.http.get<Iproduct[]>(`http://localhost:3000/products?_limit=3`)
  }
  trandyProducts() {
    return this.http.get<Iproduct[]>(`http://localhost:3000/products?_limit=8`)
  }
  searchProducts(query: string) {
    return this.http.get<Iproduct[]>(`http://localhost:3000/products?q=${query}`)
  }
  localAddToCart(data: Iproduct) {
    let cartData = []
    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]))
      this.cartData.emit([data])
    } else {
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData)
    }
  }

  removeItemToCart(id: number) {
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      let items: Iproduct[] = JSON.parse(cartData)
      items = items.filter((item: Iproduct) => {
        return id !== item.id;
      })
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items)
    }
  }

  addCart(cartData: Icart) {
    return this.http.post(`http://localhost:3000/cart`, cartData)
  }
  getCartList(id: number) {
    return this.http.get<Iproduct[]>(`http://localhost:3000/cart?userId=${id}`, { observe: "response" }).subscribe((res) => {
      if (res && res.body) {
        this.cartData.emit(res.body)
      }
    })
  }
  removeFromCart(cartId: number) {
    return this.http.delete(`http://localhost:3000/cart/${cartId}`)
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Icart[]>(`http://localhost:3000/cart?userId=${userData.id}`)
  }
  orderNow(data: Iorder) {
    return this.http.post(`http://localhost:3000/orders`, data)
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Iorder[]>(`http://localhost:3000/orders?userId=${userData.id}`)
  }
  deleteCartItems(cartId: number) {
    return this.http.delete(`http://localhost:3000/cart/${cartId}`, {observe:"response"}).subscribe((res)=>{
      if(res){
        this.cartData.emit([])
      }
    })
  }
  cancelOrder(orderId: number) {
    return this.http.delete(`http://localhost:3000/orders/${orderId}`)
  }
}
