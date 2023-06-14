import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier.service';
import { ProductService } from 'src/app/services/product.service';
import { WhishlistService } from 'src/app/services/whishlist.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
//---------------------
  panier : any;
  price: any;
  number : number = 0;
  //---------------------

  id : any;
  msg : String ='';
  trainer:any={};
  findedProduct : any;
  //-----------------
  whish : any ;
  whish_number : number = 0;
  category : any ;
  filterTerm!: string;
  product : any ;
  constructor( private productService : ProductService,
                private formBuilder:FormBuilder,
                private router:Router,
                private panierService:PanierService,
                private whishlistService : WhishlistService,
                private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.GetAllCategory();
    this.id  = localStorage.getItem("connectedUser");
    console.log(this.id);
    this.panierService.getAllproduct(this.id).subscribe(
   (data)=>{
     this.panier=data.panier;
     console.log('Panier',this.panier.user);
   });
   this.panierService.TotalPrice(this.id).subscribe(
    (result)=>{
      this.price = result.prices;
      this.number = result.nbr;
    }
  )
  
   this.getAllWhishlist();
   this.getAllProduct();

  }

  AllProduct() {
    this.id  = localStorage.getItem("connectedUser");
    this.panierService.getAllproduct(this.id).subscribe(
      (result) => {
        this.panier = result.panier ;
        console.log('Get All Product In Bascket');      
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
        this.whish = data.wishes;
        this.whish_number = data.number ;
      }
    )
  }

  getAllProduct(){
    console.log('here in get all product ');
    this.productService.getAllproducts().subscribe(
      (data)=>{
        this.product = data.products;
        console.log(this.product);
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


