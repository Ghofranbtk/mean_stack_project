import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  panierUrl: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getAllproduct(id :any){
    return this.httpClient.get<{panier:any}>(`${this.panierUrl}/api/panier/panier/${id}`);
  }
  
  AddPanier(product:any) {
    return this.httpClient.post<{panier:any,message : any}>(`${this.panierUrl}/api/panier/product/add`,product);
   }

   AddCart(product:any) {
    return this.httpClient.post<{panier:any,message : any}>(`${this.panierUrl}/api/panier/cart/add`,product);
   }
   TotalPrice(id:any){
     return this.httpClient.get<{prices:any,nbr:number}>(`${this.panierUrl}/api/panier/panier/prices/${id}`)
   }
  
   addProductInBasket(panier:any){
    return this.httpClient.post<{result:any}>(`${this.panierUrl}/api/panier/bascket/add`,panier);
   }
   
   deleteProductFromBasket(panier:any){
    // let formData = new FormData();
    // formData.append('panier',panier);
   // formData.append('id',id);
    return this.httpClient.post<{result:any , message :any}>(`${this.panierUrl}/api/panier/bascket/delete`,panier);
   }
   DeleteProduct(panier:any){
    return this.httpClient.post<{result:any, number:number}>(`${this.panierUrl}/api/panier/bascket/delete/product`,panier);
   }

   getProductByID(product : any){
    return this.httpClient.post<{pro:any,message :String}>(`${this.panierUrl}/api/panier/products`,product);
   }
}
