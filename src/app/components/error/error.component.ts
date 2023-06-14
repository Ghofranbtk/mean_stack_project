import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  product : any ;
  categorie : any ;
  constructor(private productService : ProductService,
              private router : Router,
              private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.getProduct();
    this.GetCategory();
  }

  getProduct(){
    this.productService.gettrends().subscribe(
      (data)=>{
        this.product = data.trend ;
      }
    )
  }

  GetCategory(){
    this.categoryService.allCategory().subscribe(
      (data)=>{
        this.categorie = data.category ;
      }
    )
  }
}
