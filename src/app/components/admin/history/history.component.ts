import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  orders : any ;
  id_user  : any ;
  filterTerm!: string;
  p: number = 1;
  constructor(private orderService : OrderService,
              private userService : UserService) { }

  ngOnInit(): void {
    this.DelivredOrder();
  }

  DelivredOrder(){
    this.orderService.ShowValidateOrder().subscribe(
      (data)=>{
        this.orders = data.orders ;
        this.traitment();
      }
    )
  }

  traitment(){
    for (let i = 0; i < this.orders.length; i++) {
     this.getUser(this.orders[i].user , i);
    
    }
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
}
