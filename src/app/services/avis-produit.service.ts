import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvisProduitService {

  avisUrl: string = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }
   
 AddAvisProduct(avis:any) {
  return this.httpClient.post<{message:any}>(`${this.avisUrl}/api/avis/avis-produit/add`,avis);
 }

 getAllreviews(){
  return this.httpClient.get<{review:any,nbr :any}>(`${this.avisUrl}/api/avis/review`);
}

getReviewProduct(id : any){
  return this.httpClient?.get<{review:any,nbr:String, star : any}>(`${this.avisUrl}/api/avis/review/${id}`);
}

getNumber(id : any){
  return this.httpClient?.get<{number:any}>(`${this.avisUrl}/api/avis/number/${id}`);
}

}
