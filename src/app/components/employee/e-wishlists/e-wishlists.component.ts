import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { WhishlistService } from 'src/app/services/whishlist.service';

@Component({
  selector: 'app-e-wishlists',
  templateUrl: './e-wishlists.component.html',
  styleUrls: ['./e-wishlists.component.css']
})
export class EWishlistsComponent implements OnInit {

  wishlist : any ;
  wish  = new Array();
  deleted : any ;
  filterTerm!: string;
  p: number = 1;
  constructor(private wishlistService : WhishlistService,
              private router : Router,
              private productService : ProductService) { }

  ngOnInit(): void {
    this.GetWishlist();
  }

  GetWishlist(){
    this.wishlistService.deblicated().subscribe(
      (data)=>{
        console.log(data.wish);
         this.wishlist = data.wish ;
          this.trait();
          console.log('wiiiish',this.wishlist);
      }
    )
  }
  trait(){
    for (let i = 0; i < this.wishlist.length; i++) {
      this.GetInformation(this.wishlist[i]);
    }
  }
  NumberWish(wishlist : any){
    this.wishlistService.GetNumberWish(wishlist.name).subscribe(
      (data)=>{
        wishlist.nbr = data.number;
        // console.log('dataa',wishlist);
      }
    )
  }
  GetInformation(wish: any){
    this.wishlistService.GetInformation(wish).subscribe(
      (data)=>{
        wish = data.wish
        this.NumberWish(wish);
        this.wish.push(data.wish);
        // console.log('woooo',this.wish);
      }
    )
  }

  ViewProduct(id : any){
    console.log('Show Details of products :');
    this.productService.getProductByName(id).subscribe(
      (data)=>{
        this.router.navigate([`view-product/${data.product._id}`])
      }
    )
    // this.router.navigate([`view-product/${id}`]).then(
      // ()=>{
        // this.ngOnInit();
        // window.location.reload();
      // }
    // )
  }
}
