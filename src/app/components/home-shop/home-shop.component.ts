import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier.service';
import { ProductService } from 'src/app/services/product.service';
import { WhishlistService } from 'src/app/services/whishlist.service';

@Component({
  selector: 'app-home-shop',
  templateUrl: './home-shop.component.html',
  styleUrls: ['./home-shop.component.css']
})
export class HomeShopComponent implements OnInit {
  product : any ;
  id_user : any ;
  constructor(private productService : ProductService,
              private router : Router,
              private wishlistService : WhishlistService,
              private panierService : PanierService) { }

  ngOnInit(): void {
    this.id_user = localStorage.getItem("connectedUser");
    this.GetProducts();
  }

  GetProducts(){
    this.productService.HomeProducts().subscribe(
      (data)=>{
        this.product = data.product;
        console.log('fff',this.product);
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

  SaveInPanier(produit : any ) {
    produit.user = this.id_user ;
    this.panierService.AddPanier(produit).subscribe(
    (data) => {
    console.log('Here data from BE after add product in panier',data);
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
