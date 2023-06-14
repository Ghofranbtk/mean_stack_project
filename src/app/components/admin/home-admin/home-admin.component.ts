import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { CategoryService } from 'src/app/services/category.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
 
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  // --------------------------------------
  data = [['Category' , 'Number']] ;
  data2 = [['Category','Payment']];
  number : any ;
  categorys : any ;
  nbr_user : any ;
  nbr_order : any ;
  nbr_product : any ;
  prices : any ;
  latestArrivals : any ;
  constructor(private categoryService : CategoryService,
              private userService : UserService,
              private orderService : OrderService,
              private productService : ProductService) {}

  pieChart: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    dataTable:   this.data ,
    options: { 
    'pieHole':1,
    'pieSliceTextStyle': {
      'color':'white',
      
    },
    'fontSize' : 14,
    'fontName':'Roboto',
    'colors' : ['#c96','#a6c76c','#bf8040','#777']
     },

  };
  lineChart: GoogleChartInterface = {
    chartType: GoogleChartType.LineChart,
    dataTable:  this.data2
    ,
    options: { 
    'pieHole':1,
    'pieSliceTextStyle': {
      'color':'white'
    },
    'fontSize' : 14,
    'fontName':'Roboto',
    'colors' : ['#c96']
      
  },
    
  }
  ngOnInit(): void {
   this.GetCategory();
   this.GetNumberUser();
   this.GetNumberOrder();
   this.GetNumberProduct();
   this.GetTotalPrices();
   this.GetLatestProduct();
  }

  taritment(categ : any , nbre : any ){
    for (let i = 0; i < nbre; i++) {
      console.log('nuumber',i)
     var nbr =  this.GetNumber(categ[i].name);   
    }
  }

  GetNumberUser(){
    this.userService.getAllUsers().subscribe(
      (data)=>{
        this.nbr_user = data.nbr ;
      }
    )
  }

  GetNumberProduct(){
    this.productService.getAllproducts().subscribe(
      (data)=>{
        this.nbr_product = data.number;
      }
    )
  }

  GetNumberOrder(){
    this.orderService.AllOrder().subscribe(
      (data)=>{
        this.nbr_order = data.number;
      }
    )
  }

  GetTotalPrices(){
    this.orderService.TotalPrices().subscribe(
      (data)=>{
        this.prices = data.prices;
      }
    )
  }

  GetCategory(){
    
    this.categoryService.allCategory().subscribe(
      (data)=>{
        this.categorys = data.category;
        this.number = data.nbr;
       this.taritment(data.category , data.nbr);
       this.trait(data.category , data.nbr);
      }
    )
  }

  trait(categ : any , nbre : any){
    for (let i = 0; i < nbre; i++) {
     var nbr =  this.GetNumberPaymentt(categ[i].name);   
    }
  }

  GetNumberPaymentt(category : any ){
    var nbr = 0;
    this.categoryService.GetPayment(category).subscribe(
      (result)=>{
        nbr = result.number;
        this.data2.push([category , nbr]);
      }
    )
    return nbr ;
  }

  GetNumber (category : any){
    var nbr = 0;
    this.categoryService.GetNumberProduct(category).subscribe(
      (data)=>{
        nbr = data.number;
        this.data.push([category , nbr]);
      }
    )
    return nbr ;
  }

  GetLatestProduct(){
    this.productService.LatestArrivals().subscribe(
      (data)=>{
        this.latestArrivals = data.produits;
        console.log('cccccc',data.produits);
      }
    )
  }
}
