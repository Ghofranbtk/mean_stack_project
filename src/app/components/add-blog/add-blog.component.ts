import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  imagePreview: string = '';
  imagePrevieww: string = '';
  blog: any = {};
  f: any;
  ff: any;
  msg: any;
  ok: any;
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
  myDate : any;

  constructor(private formBuilder: FormBuilder,
    private blogService: BlogService) { }

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


  }

  AddBlog() {
    console.log('here in add blog', this.blog);
    const v = this.checkData(this.blog);
    if (v == true) {
      this.blog.date = this.getDate();
      console.log('here in add blog', this.blog);
      this.blogService.AddBlog(this.blog, this.blogForm.value.img).subscribe(
        (data) => {
          if (data.message == "-1") {
            console.log('This Blog Exist ! ');
          }
          else {
            console.log('Here data from BE after add blog', data.blog);
            this.blogService.AdBlog(data.blog, this.blogForm.value.imgg).subscribe(
              (result) => {
                console.log(result.message);
                this.blogService.deleteBlog(data.blog._id).subscribe(
                  (res) => {
                    console.log(res.message);
                  }
                )
              }
            )
          }
        }
      )
    }
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
    else if (this.f == "" || this.f == undefined) {
      this.msg = "Photo 1 is required !";
      valide = false;
      this.ok = valide;
    }
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

  getDate(){
      
    this.myDate = new Date();
    console.log('test date function ok' , this.myDate);
    
    return this.myDate;
  }

}
