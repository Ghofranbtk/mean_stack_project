import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  imagePreview: string = '';
  imagePrevieww: string = '';
  blog: any ;
  f: any;
  ff: any;
  msg: any;
  ok: any;
  id_blog : any ;
  blogForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    description1: new FormControl(''),
    quote: new FormControl(''),
    description2: new FormControl(''),
    img: new FormControl(''),
    imgg: new FormControl(''),
    date : new FormControl('')
  });
  constructor(private formBuilder : FormBuilder,
              private blogService :BlogService,
              private router : Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.blogForm = this.formBuilder.group({
      title: [''],
      author: [''],
      description1: [''],
      quote: [''],
      description2: [''],
      img: [''],
      imgg: [''],
      date : ['']
    })

    this.id_blog = this.activatedRoute.snapshot.paramMap.get('id');
    this.GetBlog(this.id_blog);

  }

  GetBlog(id : any){
    this.blogService.getBlogById(id).subscribe(
      (data)=>{
        this.blog = data.blog ;
      }
    )
  }

  EditBlog(){
    console.log('lll',this.imagePreview != "");
    console.log('lll2',this.blogForm.value.imgg != "");
    var photo1 = (this.blogForm.value.img !="" );
    var photo2 = (this.blogForm.value.imgg != "");
  const v = this.checkData(this.blog);
  if ( v == false){
    console.log('error');
  }
  else {
    if( photo1 ==  false && photo2 == false){
        console.log('edit l ktiba khw');
        this.Edit();
       // this.router.navigate([`blogs`]);
        
    }
    else if (photo1 == true && photo2 == false ){
        console.log('edit l taswira wa7da ') ;
      this.Edit1();    
       //this.router.navigate([`blogs`]);  
    }
    else if (photo1 == true && photo2 == true ){
      console.log('edite lel zouz');
      this.blogService.EditBlog1(this.blog, this.blogForm.value.img).subscribe(
        (data)=>{
          console.log('edite fi wa7da ');
          console.log(data.message);
          this.blogService.EditBlog2(data.blog, this.blogForm.value.imgg).subscribe(
            (result)=>{
              console.log(result.message);
              // this.router.navigate([`blogs`]);
            }
          )
        }
      )
    }
  }
}

  Edit(){
    this.blogService.EditBlog(this.blog).subscribe(
      (data)=>{
        console.log(data.message)
      }
    )
  }

  Edit1(){
    console.log('edite lel wa7da');
    this.blogService.EditBlog1(this.blog, this.blogForm.value.img).subscribe(
      (data)=>{
        console.log(data.message);
      }
    )
  }

  checkData(blog: any) {
    var valide = true;
    console.log(valide);
    if (blog.title == undefined) {
      this.msg = "Title is required !";
      valide = false;
      this.ok = valide;
    }
    else if (blog.author == undefined) {
      this.msg = "Author is required !";
      valide = false;
      this.ok = false;
    }
    else if (blog.description1 == undefined) {
      this.msg = "Description1 is required !";
      valide = false;
      this.ok = valide;
    }
    // else if (this.f == "" || this.f == undefined) {
      // this.msg = "Photo 1 is required !";
      // valide = false;
      // this.ok = valide;
    // }
    else if (blog.quote == undefined) {
      this.msg = "Quote is required !";
      valide = false;
      this.ok = valide;
    }
  
    else if (blog.description2 == undefined) {
      this.msg = "Description2 is required !";
      valide = false;
      this.ok = valide;
    }
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

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.f = file;
    this.blogForm.patchValue({ img: file });
    this.blogForm.updateValueAndValidity();
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
    this.blogForm.patchValue({ imgg: filee });
    console.log('filee', filee);
    this.blogForm.updateValueAndValidity();
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
