import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-view-blogs',
  templateUrl: './view-blogs.component.html',
  styleUrls: ['./view-blogs.component.css']
})
export class ViewBlogsComponent implements OnInit {
  blogs : any = {} ;
  description : any ;
  constructor(private blogService : BlogService,
              private router : Router) { }

  ngOnInit(): void {
    this.getBlogs();
    
  }

  getBlogs(){
    console.log('here in get all Blogs');
    this.blogService.getAllBlogs().subscribe(
      (result)=>{
        console.log('blogs :',result.blogs);
        this.blogs = result.blogs;
      }
    )
  }

  Substring (ch : String){
    var result = ch.substring(0,8);
     this.description = result;
    // console.log('ghghg',result);
    return result;
  }

  ShowDetails (id :any) {
    console.log('Show Details of blog :');
    this.router.navigate([`view-blog/${id}`]);
  }

}
