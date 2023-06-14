import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { OrderService } from 'src/app/services/order.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  order : any ;
  id_order : any ;
  number_order : any ;
  id_user : any ;
  user : any ;
  constructor(private orderService : OrderService,
              private activatedRoute : ActivatedRoute,
              private userService : UserService) { }

  ngOnInit(): void {
    this.id_user = localStorage.getItem("connectedUser");
   this.id_order = this.activatedRoute.snapshot.paramMap.get('id');
   console.log(this.id_order);
   this.GetOrder();
   this.GetUser();
  }

  GetOrder(){
    console.log('here in get roders');
    this.orderService.OrderByID(this.id_order).subscribe(
      (data)=>{
        this.order = data.order ;
        this.number_order = data.order.number;
        console.log('hhhhhhh',data.order);
      }
    )
  }

  counter(i: number) {
    return new Array(i);
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Roboshop_Invoice.pdf');
    });
  }

  GetUser(){
    this.userService.getUserById(this.id_user).subscribe(
      (data)=>{
        this.user = data.user;
      }
    )
  }
}
