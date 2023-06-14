import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  users : any ;
  filterTerm!: string;
  p: number = 1;
  filterTermm!: string;
  pp: number = 1;
  order_user : any ;
  user : any ;
  deleted : any;
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

  EditUser(email : any){
    this.GetUserByEmail(email);
    this.router.navigate([`edit-user/${this.user._id}`])
  }



  Delete(email : any){

    this.userService.getUserByEmail(email).subscribe(
      (data)=>{
        this.deleted = data.user
        console.log('this.deleted',this.deleted);
       
      }
    )
  }

  DeleteUser(user:any){
   
    this.userService.deleteUser(user._id).subscribe(
      (data)=>{
        console.log(data.message);
        this.ngOnInit();
      }
    )
  }

}
