import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier.service';
import { ProductService } from 'src/app/services/product.service';
import { WhishlistService } from 'src/app/services/whishlist.service';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.css']
})
export class RelatedProductComponent implements OnInit {

  products : any ;
  id_user: any ;
  constructor(private productService : ProductService,
              private panierService : PanierService,
              private wishlistService : WhishlistService,
              private router : Router) { }

  ngOnInit(): void {
    this.id_user = localStorage.getItem("connectedUser");
    this.getTrend();
  }

  getTrend(){
    this.productService.gettrends().subscribe(
      (data)=>{
        this.products = data.trend ;
      }
    )
  }

  SaveInPanier(produit : any ) {
    produit.user = this.id_user ;
    this.panierService.AddPanier(produit).subscribe(
    (data) => {
    console.log('Here data from BE after add product in panier',data);
    }
  )
}

addWishlist(produit : any ) {
  produit.user = this.id_user;
  console.log('Adding this product in Whislist :', produit);
  this.wishlistService.AddProduct(produit).subscribe(
    (data) => {
      console.log(data.message);
    
    }
  )
}

viewProduct(id : any ){
  console.log('Show Details of products :');
  this.router.navigate([`view-product/${id}`])
  // .then(
    // ()=>{
      // this.ngOnInit();
      // window.location.reload();
    // }
  // )
}
 
}
