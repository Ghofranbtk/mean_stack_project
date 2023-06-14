import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders : any ;
  id_user : String = "" ;
  filterTerm!: string;
  p: number = 1;
  id_order : any ;
  constructor(private orderService : OrderService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getOrder();
   
  }

  traitment(){
    for (let i = 0; i < this.orders.length; i++) {
     this.getUser(this.orders[i].user , i);
    
    }
  }

  getOrder(){
    this.orderService.ShowNoValidateOrder().subscribe(
      (data)=>{
        this.orders = data.orders;
        console.log(data.orders)
        this.traitment();
      }
    )
  }

  getOrderId(id : any){
    this.id_order = id ;
  }

  getUser(id : any , i : any){
    this.userService.getUserById(id).subscribe(
      (data)=>{
        this.id_user = data.user.fname +" "+data.user.lname ;
        this.orders[i].user = this.id_user ;
        
      }
    )
    return this.id_user;
  }

  validateOrder(id: any ){
    this.orderService.ValidateOrder(id).subscribe(
      (data)=>{
        console.log(data.message);
        this.ngOnInit();
      }
    )
  }
}
