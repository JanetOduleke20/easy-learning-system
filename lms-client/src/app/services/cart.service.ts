import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public baseUrl = environment.baseUrl;

  public userBaseUrl = environment.userBaseUrl

  constructor(
    private _http: HttpClient,
    private _router: Router

  ) { }

  addToCart(data: any) {
    return this._http.post<any>(`${this.userBaseUrl}add-to-cart`, data)
  }
  getItemsFromCart(data: any) {
    return this._http.post<any>(`${this.userBaseUrl}get-items-from-cart`, data)
  }
  getCourseDetails(data:any) {
  return this._http.post<any>(`${this.userBaseUrl}get-course-details`, data)

 }
 deleteFromCart(data: any) {
  return this._http.post<any>(`${this.userBaseUrl}delete-from-cart`, data)
 }
}


