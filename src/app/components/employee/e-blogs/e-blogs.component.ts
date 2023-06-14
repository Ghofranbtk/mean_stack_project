import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
@Component({
  selector: 'app-e-blogs',
  templateUrl: './e-blogs.component.html',
  styleUrls: ['./e-blogs.component.css']
})
export class EBlogsComponent implements OnInit {

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
  

}
