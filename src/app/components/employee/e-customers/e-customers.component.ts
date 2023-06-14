import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-e-customers',
  templateUrl: './e-customers.component.html',
  styleUrls: ['./e-customers.component.css']
})
export class ECustomersComponent implements OnInit {

  users : any ;
  filterTerm!: string;
  p: number = 1;
  order_user : any ;
  user : any ;
  filterTermm!: string;
  pp: number = 1;
  constructor(private userService : UserService,
    private orderService : OrderService,
    private router:Router) { }

  ngOnInit(): void {
    this.getUser();

  }

  traitment(){
    for (let i = 0; i < this.users.length; i++) {  
      this.NumberOrder(this.users[i]);  
    }
  }
  getUser(){
    this.userService.getAllUsers().subscribe(
      (data)=>{
        this.users = data.users;
        this.traitment();
      }
    )
  }
  NumberOrder(user :any){
    this.userService.NumberOfOrders(user._id).subscribe(
      (data)=>{
        user.nbr = data.number ;
        
      }
    )
  }
  getOrderById(id:any){
    this.orderService.UserOrderByID(id).subscribe(
      (data)=>{
        this.order_user = data.order;
        console.log('ooooo',this.order_user)
      }
    )
  }
  GetUserByEmail(email : any){
    this.userService.getUserByEmail(email).subscribe(
      (data)=>{
        this.user = data.user
        console.log('user',this.user);
        this. getOrderById(this.user._id);
      }
    )
  }
}
