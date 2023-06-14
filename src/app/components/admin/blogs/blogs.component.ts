import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  p: number = 1;
  filterTerm!: string;
  blog : any ;
  id_blog : any 
  constructor(private blogService : BlogService,
              private router : Router) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(){
    this.blogService.getAllBlogs().subscribe(
      (data)=>{
        this.blog = data.blogs ;
      }
    )
  }

  viewBlog(id : any){
    this.router.navigate([`view-blog/${id}`]);
  }
  
  getId(id : any){
    this.id_blog = id ;
  }

  DeleteBlog(id : any){
    this.blogService.deleteBlog(id).subscribe(
      (data)=>{
        console.log(data.message);
        this.ngOnInit();
      }
    )
  }

  editBlog(id : any){
    this.router.navigate([`edit-blog/${id}`]).then(
      ()=>{
        window.location.reload();
      }
    )
  }

}
