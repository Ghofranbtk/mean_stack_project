import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier.service';
import { WhishlistService } from 'src/app/services/whishlist.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit {
  whish : any ;
  number : any ;
  id : any ;
  constructor(private router : Router,
              private whishlistService : WhishlistService,
              private panierService : PanierService) { }

  ngOnInit(): void {
    this.id  = localStorage.getItem("connectedUser");

    this.getAllWhishlist();
  }

  getAllWhishlist() {
    this.whishlistService.getWishesOfUser(this.id).subscribe(
      (data)=>{
        this.whish = data.wishes;
        this.number = data.number ;
      }
    )

  }


  SaveInPanier( panier:any){
    this.panierService.AddPanier(panier).subscribe(
      (data) => {
        console.log('Here data from BE after add user',data);
        // this.router.navigate(['whishlist']).then(() => {
          // window.location.reload();
        // });
        this.ngOnInit();
      
      }
    )
  }

  deleteWhish (id : any) {
    console.log('here in delete product from whishlist ');
    this.whishlistService.DeleteProduct(id).subscribe(
      (data)=>{
        this.ngOnInit();
      }
    )
  }
}
