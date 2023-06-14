import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  msgError : any;
  msg : String ="";
  ok = false;

  
 mab=['Name','Email','Subject','Message'];

  feedbackForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone : new FormControl(''),
    subject : new FormControl(''),
    message: new FormControl('')
  });
  feedback : any= {};


  constructor(
    private feedbackService: FeedbackService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.feedbackForm = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      subject: [''],
      message: [''],
    })
  }

  Addfeedback() {
     this.ok = this.testData();
    var x = this.validateEmail(this.feedback.email);
    console.log(x);
    if ( x == false){
      console.log('Check Your Email !');
      this.msgError = "Chek Your Email !";
    
    }
    else if (this.ok == true) {
    
    console.log('Here my feedback ', this.feedback);
    this.feedbackService.Addfeedback(this.feedback).subscribe(
      (data) => {
        console.log('Here data from BE after add feedback', data.message);
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });

      }
    );
  }

  }


  testData(){
    var ok = true ;
    var name = this.feedback.name;
    var subject = this.feedback.subject;
    var message =this.feedback.message;
    console.log(message);
    if(name == "") {
      ok = false ;
      console.log('Name is required !');
      this.msgError = 'Name is required !'

    }
    else if (subject == undefined) {
      ok = false ;
      console.log('Subject is required !');
      this.msgError = 'Subject is required !'
    }
    else if (message == undefined) {
      ok = false ;
      console.log('Message is required !');
      this.msgError = 'Message is required !'

    }
     return ok ;
    /*
    var tab=[name,email,subject,message];
    console.log(tab.length - 1);
    for (let index = 0; index < tab.length -1; index++) {
      if(tab[index] == undefined) {
        
        console.log(this.mab[index] , 'is required !');
        this.ok = false;
        this.msgError = (this.mab[index]+" is required !");
        break;
      }
    }
    */
    }

    validateEmail(email : string) {
      const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regularExpression.test(String(email).toLowerCase());
     }
                            
 
   
   
   
   
}


