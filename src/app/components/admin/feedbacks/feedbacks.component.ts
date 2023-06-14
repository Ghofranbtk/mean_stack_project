import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {
  feedbacks : any ;
  id_feedback : any ;
  p: number = 1;
  filterTerm!: string;
  constructor(private feedbackService : FeedbackService,
              private router : Router) { }

  ngOnInit(): void {
    this.getFeedback();
  }

  getFeedback(){
    this.feedbackService.getAllFeedbacks().subscribe(
      (data)=>{
        this.feedbacks = data.feedback;
      }
    )
  }

  getFeedbackId(id : any){
    this.id_feedback = id ;
  }

  DeleteFeedback(id : any){
    this.feedbackService.DeleteFeedback(id).subscribe(
      (data)=>{
        console.log(data.message);
        this.ngOnInit();
      }
    )
  }

  AddToHomePage(feedback : any){
    feedback.visibility = true ;
    this.feedbackService.AddToHomeList(feedback).subscribe(
      (data)=>{
        console.log(data.message);
      }
    )
  }

  DeleteFromHomePage(feedback :any){
    feedback.visibility = false;
    this.feedbackService.DeleteFromHomeList(feedback).subscribe(
      (data)=>{
        console.log(data.message);
      }
    )
  }
}
