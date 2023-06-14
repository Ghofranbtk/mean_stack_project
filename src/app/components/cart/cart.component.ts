import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier.service';
import { ProductService } from 'src/app/services/product.service';
import { WhishlistService } from 'src/app/services/whishlist.service';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  pro: any = [];
  product: any;
  number: Number = 0;
  price: Number = 0;
  panier: any;
  myDate : any ;
  id: any;
  captcha = false ;
  msg : String = "";
  form = new FormGroup({
    type: new FormControl('', Validators.required)
  });
  order: any = {};
  orderForm: FormGroup = new FormGroup({
    date: new FormControl(''),
    user: new FormControl(''),
    num_cart: new FormControl(''),
    expire: new FormControl(''),
    cvv: new FormControl('')
  });
  constructor(private productService: ProductService,
    private panierService: PanierService,
    private router: Router,
    private whishlistService: WhishlistService,
    private _render: Renderer2,
    private fb: FormBuilder,
    private orderService : OrderService
    ) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      date: [''],
      user: [''],
      num_cart: [''],
      expire: [''],
      cvv: ['']
    })



    this.productService.gettrends().subscribe(
      (data) => {
        this.pro = data.trend;
      }
    );
    this.AllProduct();
    this.getPrices();
    let script = this._render.createElement('script');
    script.defer = true;
    script.async = true;
    script.src = "https://www.google.com/recaptcha/api.js";
    this._render.appendChild(document.body, script);
  }

  AllProduct() {
    this.id = localStorage.getItem("connectedUser");
    this.panierService.getAllproduct(this.id).subscribe(
      (result) => {
        this.panier = result.panier;
        console.log('Get All Product In Bascket', this.panier);
      }
    )
  }


  getPrices() {
    this.panierService.TotalPrice(this.id).subscribe(
      (data) => {
        this.number = data.nbr;
        this.price = data.prices;
        console.log(this.number);
      }
    )
  }

  SaveInPanier(panier: any) {
    panier.stock = "In stock";
    panier.user = this.id;
    this.panierService.AddPanier(panier).subscribe(
      (data) => {
        console.log(data.message);
        console.log('Here data from BE after add user', data.panier);
        this.ngOnInit();

      }
    )

  }

  DeleteOne(panier: any) {
    console.log(' panier', panier);

    this.panierService.deleteProductFromBasket(panier).subscribe(
      (data) => {
        console.log(data.message);
        console.log(data.result);
         this.ngOnInit();

      }
    )
  }

  DeleteProduct(panier: any) {
    console.log('Delete this Product From Basket: ', panier);
    this.panierService.DeleteProduct(panier).subscribe(
      (data) => {

         this.ngOnInit();
      }
    )
  }

  checkout() {
    const connectedUser = localStorage.getItem("connectedUser");
    if (connectedUser == null) {
      //-----ya login ya signup
      localStorage.setItem('token', JSON.stringify("Login From Checkout"));
      this.router.navigate(['account']);
    }
    else {
      
      const date = this.getDate();
      this.order.date = date ;
      this.order.user = connectedUser ;
      this.order.number = this.number ;
      this.order.products = this.panier;
      this.order.total_prices = this.price ;
      console.log('here in checkout !', this.order);
      const ok = this.ValideData(this.order);
      if ( ok == true){
        if ( this.captcha == false ){
          this.msg= "Select you are not a robot"
        }
        else{
        this.orderService.AddOrder(this.order).subscribe(
          (result)=>{
            console.log(result.message);
            for (let i = 0; i < this.panier.length; i++) {
              this.DeleteQuantity(this.panier[i]);
              this.DeleteProduct(this.panier[i]);
               
              
              
            }
            this.router.navigate([`payment/${result.product._id}`]).then(
              ()=>{
                this.ngOnInit();
                window.location.reload();
              }
            )
          }
        )
      }
      }
    }
  }

  DeleteQuantity(product : any ){
    this.productService.DeleteQuantity(product).subscribe(
      (data)=>{
        console.log(data.message);
      }
    )
  }

  ValideData(order : any ){
    var ok = true ; 
    if (order.num_cart == undefined){
      ok = false ; 
      this.msg="Please enter your Cart Number !"
    }
    else if (order.expire == undefined){
      ok = false ;
      this.msg="Please enter Date ! "
    }
    else if (order.cvv == undefined){
      ok = false ;
      this.msg = "Please enter your CVV !"
    }
    else {
      ok = true;
    }
    return ok ;
  }


  getDate(){
    this.myDate = new Date();    
    return this.myDate;
  }

  addWishlist(whish: any) {
    console.log('Adding this product in Whislist :', whish);
    if (this.id != null) {
      whish.user = this.id;
      this.whishlistService.AddProduct(whish).subscribe(
        (data) => {
          console.log(data.message);
        }
      )
    }

  }

  ShowDetails(id: any) {
    console.log('Show Details of products :');
    this.router.navigate([`view-product/${id}`]);
  }

  getProductByCategory(product: any) {
    console.log('Here in get product by this category :', product.categorie);
    this.productService.getProductByCategory(product).subscribe(
      (data) => {
        console.log('cv');
      }
    )
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captcha = true ;
  }





}
