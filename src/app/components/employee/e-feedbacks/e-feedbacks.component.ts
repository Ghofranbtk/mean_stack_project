import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-e-feedbacks',
  templateUrl: './e-feedbacks.component.html',
  styleUrls: ['./e-feedbacks.component.css']
})
export class EFeedbacksComponent implements OnInit {
  
  feedbacks : any ;
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


}
