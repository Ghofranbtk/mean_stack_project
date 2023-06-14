import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { PanierService } from 'src/app/services/panier.service';
import { ProductService } from 'src/app/services/product.service';
import { WhishlistService } from 'src/app/services/whishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  feedback :any;
  nbr : any ;
  numbre : any ;
  nb = [0,1,2];
  table : any = [];

  //---------------------
  panier : any;
  price: any;
  number : number = 0;
  //---------------------
  whish : any;
  whish_number : number = 0 ;
  id :any;
  filterTerm!: string;
  product : any ;
  category : any ;
  constructor(private router:Router,
              private feedbackService: FeedbackService,
              private panierService:PanierService,
              private whishlistService : WhishlistService,
              private productService : ProductService,
              private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.id  = localStorage.getItem("connectedUser");
    this.GetAllCategory();
    this.getFeed();
   
    console.log('num',this.nb);
   this.panierService.getAllproduct(this.id).subscribe(
    (data)=>{
      this.panier=data.panier;
      console.log('Panier',this.panier);

      console.log('houni ne7seb',data.panier);
      this.panierService.TotalPrice(this.id).subscribe(
       (result)=>{
         console.log('data of prices ',result);
         this.price = result.prices;
         this.number = result.nbr;
       }
     )
     
    });
    this.getAllWhishlist();
    this.getAllProduct();
 
  }
  counter(i: number) {
    console.log('array', new Array(i));
    return new Array(i);
  }


  getFeed(){
    this.feedbackService.GetVisibleFeedback().subscribe(
      (data)=>{
        this.feedback = data.feedback;
        console.log('feedbaacks',data.feedback);
      }
    )
  }

  User(){
    const user  = localStorage.getItem("connectedUser");
    if (user == null){
      this.router.navigate(['account']);
    }
    else{
      console.log('this is user id :', user);
      this.router.navigate([`profile/${user}`]);

    }

  }

  SaveInPanier( panier:any){
    console.log(' panier',panier);
    this.panierService.AddPanier(panier).subscribe(
      (data) => {
        console.log('Here data from BE after add user',data);
        
      }
    )

  }

  DeleteProduct(panier:any){
    console.log('Delete this Product From Basket: ',panier);
    this.panierService.DeleteProduct(panier).subscribe(
      (data)=>{
       
        this.ngOnInit();
      }
    )
  }

  getAllWhishlist() {
    this.whishlistService.getWishesOfUser(this.id).subscribe(
      (data)=>{
       
        this.whish_number = data.number ;
        this.whish = data.wishes ;
        console.log('this.wishes :',this.whish) ;
      }
    )
  }

 
  getAllProduct(){
    console.log('here in get all product ');
    this.productService.getAllproducts().subscribe(
      (data)=>{
        this.product = data.products;
        console.log('hahahaha',this.product);
      }
    )
  }
 
 
 
 
 
 
 

  viewProduct(id : any ){
    console.log('Show Details of products :');
    this.router.navigate([`view-product/${id}`]).then(
      ()=>{
        this.ngOnInit();
        window.location.reload();
      }
    )
  }

  viewCart(){
    const connectedUser = localStorage.getItem("connectedUser");
    if (connectedUser == null) {
      this.router.navigate(['account']).then(
        ()=>{
          window.location.reload();
        }
      )
    }
    else {
      this.router.navigate(['cart']).then(
        ()=>{
          window.location.reload();
        }
      )
    }
  }

  GetAllCategory(){
    console.log('here in get all categorys');
    this.categoryService.allCategory().subscribe(
      (data)=>{
        this.category = data.category ;
      }
    )
  }

  
  
  
  
  
  
  

}
