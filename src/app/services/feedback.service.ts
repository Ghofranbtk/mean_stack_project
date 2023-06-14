import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  feedbackUrl: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

   
 Addfeedback(feedback:any) {
  return this.httpClient.post<{message:any}>(`${this.feedbackUrl}/api/feedback/feed/add`,feedback);
 }

 getAllFeedbacks(){
  return this.httpClient.get<{feedback:any,nbr :any}>(`${this.feedbackUrl}/api/feedback/feedbacks`);
}

  DeleteFeedback(id : any){
    return this.httpClient.delete<{message:string}>(`${this.feedbackUrl}/api/feedback/delete/${id}`);
  }
  AddToHomeList(feedback : any ){
    return this.httpClient.put<{message:any}>(`${this.feedbackUrl}/api/feedback/home/add/${feedback._id}`,feedback);
  }

  DeleteFromHomeList(feedback : any ){
    return this.httpClient.put<{message:any}>(`${this.feedbackUrl}/api/feedback/home/delete/${feedback._id}`,feedback)
  }

  GetVisibleFeedback(){
    return this.httpClient.get<{feedback : any}>(`${this.feedbackUrl}/api/feedback/visible`)
  }
}

// /${user._id}`, user);
