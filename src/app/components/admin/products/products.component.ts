import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products : any ;
  filterTerm!: string;
  p: number = 1;
  id_product : any ;

  constructor(private productService : ProductService,
              private router : Router) { }

  ngOnInit(): void {
    this.GetAllProducts();
   
  }

  GetAllProducts(){
    this.productService.getAllproducts().subscribe(
      (data)=>{
        this.products = data.products;
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

  DeleteProduct(id : any){
    this.productService.deleteProduct(id).subscribe(
      (data)=>{
        console.log(data.message);
        this.ngOnInit();
      }
    )
  }

  getIdProduct(id : any ){
    this.id_product = id ;
  }
 
  EditProduct(id : any ){
    this.router.navigate([`edit-product/${id}`]).then(
      ()=>{
        window.location.reload();
      }
    )
  }
 
 
 
 
 
 
}
