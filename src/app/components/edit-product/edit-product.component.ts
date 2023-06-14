import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: any = {};
  inc : any ;
  imagePreview: string = '';
  imagePrevieww: string = '';
  msg: any;
  number_category: any;
  cat : any ;
  f: any;
  ff: any;
  ok : any ;
  id : any ;
  image : any ;
  productForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    categorie: new FormControl(''),
    quantity: new FormControl(''),
    description: new FormControl(''),
    img: new FormControl(''),
    imgg: new FormControl(''),
    solde: new FormControl(''),
    remise: new FormControl(''),
    detail: new FormControl('')
    // new_price : new FormControl('')
  });
  constructor(private categoryService : CategoryService,
              private formBuilder : FormBuilder,
              private productService : ProductService,
              private activatedRoute : ActivatedRoute,
              private router : Router) { }

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      name: [''],
      price: [''],
      categorie: [''],
      quantity: [''],
      description: [''],
      img: [''],
      imgg: [''],
      solde: [''],
      remise: [''],
      detail: ['']
     
    })

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.Getproduct(this.id);
    this.image = this.product.img ;
    this.getAllCategory();
  }

  getAllCategory(){
    console.log('get all categorys');
    this.categoryService.allCategory().subscribe(
      (data)=>{
        this.cat = data.category;
        this.number_category = data.nbr;
      }
    )
  }

  Getproduct(id : any){
    this.productService.getProductById(id).subscribe(
      (data)=>{
        this.product = data.product ;
        console.log(this.product);
      }
    )
  }

  EditProduct(){
    console.log('lll',this.imagePreview != "");
    console.log('lll2',this.productForm.value.imgg != "");
    var photo1 = (this.productForm.value.img !="" );
    var photo2 = (this.productForm.value.imgg != "");
  const v = this.checkData(this.product);
  if ( v == false){
    console.log('error');
  }
  else {
    if( photo1 ==  false && photo2 == false){
        console.log('edit l ktiba khw');
        this.Edit();
        this.router.navigate([`products`]);
        
    }
    else if (photo1 == true && photo2 == false ){
        console.log('edit l taswira wa7da ') ;
        this.Edit1();    
        this.router.navigate([`products`]);  
    }
    else if (photo1 == true && photo2 == true ){
      console.log('edite lel zouz');
      this.productService.editProduct1(this.product, this.productForm.value.img).subscribe(
        (data)=>{
          console.log('edite fi wa7da ');
          console.log(data.message);
          this.productService.editProduct2(data.product, this.productForm.value.imgg).subscribe(
            (result)=>{
              console.log(result.message);
              this.router.navigate([`products`]);
            }
          )
        }
      )
    }
  }
  }

  Edit(){
    console.log('hey');
  this.productService.editProduct(this.product).subscribe(
    (data)=>{
      console.log(data.message);
    }
  )
  }

  Edit1(){
    console.log('edite lel wa7da');
    this.productService.editProduct1(this.product, this.productForm.value.img).subscribe(
      (data)=>{
        console.log(data.message);
      }
    )
  }
  
  checkData(product: any) {
    var valide = true;
    if (product.name == undefined) {
      this.msg = "Name is required !";
      valide = false;
      this.ok = valide;
    }
    else if (product.price == undefined) {
      this.msg = "Price is required !";
      valide = false;
      this.ok = false;
    }
    else if (product.categorie == undefined) {
      this.msg = "Category is required !";
      valide = false;
      this.ok = valide;
    }
    else if (product.quantity == undefined) {
      this.msg = "Quantity is required !";
      valide = false;
      this.ok = valide;
    }
    else if (product.description == undefined) {
      this.msg = "Description is required !";
      valide = false;
      this.ok = valide;
    }
    else if (product.detail == undefined) {
      this.msg = "Detail is required !";
      valide = false;
      this.ok = valide;
    }
    // else if (this.f == "" || this.f == undefined) {
      // this.msg = "Photo 1 is required !";
      // valide = false;
      // this.ok = valide;
    // }
    // else if (this.ff == "" || this.ff == undefined) {
      // this.msg = "Photo 2 is required !";
      // valide = false;
      // this.ok = valide;
    // }
    else {
      valide = true;
    }
    return valide;
  }




  radio() {
    console.log('hi !');
    this.inc = this.inc + 1;
    console.log(this.inc);
    if (this.inc % 2 == 0) {
      console.log('paire');
      this.product.solde = true;
    }
    else {
      this.product.solde = false;
      this.product.remise = 0;
    }
  }


  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.f = file;
    this.productForm.patchValue({ img: file });
    this.productForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
      console.log('image 1', file);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  onImageSelectedd(event: Event) {
    const filee = (event.target as HTMLInputElement)?.files?.[0];
    this.ff = filee;
    this.productForm.patchValue({ imgg: filee });
    console.log('filee', filee);
    this.productForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePrevieww = reader.result as string;
      console.log('image 2', this.imagePrevieww);
    };
    if (filee) {
      reader.readAsDataURL(filee);
    }
  }
}
