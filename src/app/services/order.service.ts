import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl: string = 'http://localhost:3000';

 constructor(private httpClient: HttpClient) { }

 AddOrder(order:any) {
  return this.httpClient.post<{message : any, product:any}>(`${this.orderUrl}/api/order/add`,order);
 }

 AllOrder(){
  return this.httpClient.get<{orders:any , number:any}>(`${this.orderUrl}/api/order/all`);
}
  OrderByID(id :any){
    return this.httpClient.get<{order:any}>(`${this.orderUrl}/api/order/${id}`);
  }

  UserOrderByID(id :any){
    return this.httpClient.get<{order:any}>(`${this.orderUrl}/api/order/user/${id}`);
  }

  TotalPrices(){
    return this.httpClient.get<{ prices:any}>(`${this.orderUrl}/api/order/totals`);
  }

  ValidateOrder(id : any ){
    return this.httpClient?.delete<{ message: string }>(`${this.orderUrl}/api/order/validate/${id}`);
  }

  ShowValidateOrder(){
    return this.httpClient.get<{orders:any , number:any}>(`${this.orderUrl}/api/order/validated/all`);
  }

  ShowNoValidateOrder(){
    return this.httpClient.get<{orders:any , number:any}>(`${this.orderUrl}/api/order/no_validate/all`);
  }

}
