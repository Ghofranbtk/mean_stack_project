import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  inc = 0;
  product: any = {};
  imagePreview: string = '';
  imagePrevieww: string = '';
  msg: any;
  visible: any;
  ok: any;
  f: any;
  ff: any;
  categoryForm: FormGroup = new FormGroup({
    name_categorie: new FormControl(''),
    categ : new FormControl('')
  });
  category: any ={};
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
  cat : any ;
  number_category :any ;
  
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
   
   
    this.categoryForm = this.fb.group({
      name_categorie: [''],
      categ : ['']
    })

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
      // new_price : ['']
    })
   
    this.getAllCategory();

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

  Addproduct() {
    const categObj = this.category.categ ;
    this.product.categorie = categObj ;
    console.log('categooriii',categObj);
    if (this.product.solde == undefined) {
      this.product.solde = true;
      // this.product.new_price =this.product.price - ((this.product.price * this.product.solde) / 100) ;
    }
    const v = this.checkData(this.product);
    console.log('this is my img :', v);
    console.log('this is product', this.product);
    if (v == true) {
      this.productService.addProduct(this.product, this.productForm.value.img).subscribe(
        (data) => {
          console.log('Here data from BE after add product', data.product);
          this.productService.adMenu(data.product, this.productForm.value.imgg).subscribe(
            (result) => {
              console.log(result.product);
              console.log(result.product.img, result.product.imgg);
              this.productService.deleteProduct(data.product._id).subscribe(
                (res) => {
                  console.log(res.message);
                    this.router.navigate(['products']);
                }
              )
            }
          )

        }
      );
    }
    else {
      console.log('error');
    }
  }

  addCategory() {
      console.log('Add Category :', this.category.name_categorie);
      this.categoryService.AddCategory(this.category).subscribe(
        (data) => {
          console.log(data.message);
          this.ngOnInit();
        }
      )
    }

    getAllCategory(){
      console.log('get all categorys');
      this.categoryService.allCategory().subscribe(
        (data)=>{
          this.cat = data.category;
          this.number_category = data.nbr;
          console.log('caaaaa:',this.cat);
        }
      )
    }
  

    counter(i: number) {
      return new Array(i);
    }
  checkData(product: any) {
    var valide = true;
    console.log(valide);
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
    else if (this.f == "" || this.f == undefined) {
      this.msg = "Photo 1 is required !";
      valide = false;
      this.ok = valide;
    }
    else if (this.ff == "" || this.ff == undefined) {
      this.msg = "Photo 2 is required !";
      valide = false;
      this.ok = valide;
    }
    else {
      valide = true;
    }
    return valide;
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



