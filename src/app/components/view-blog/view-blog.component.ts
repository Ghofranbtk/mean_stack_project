import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {
  blog : any = {};
  id_blog : any ;
  constructor(private blogService : BlogService,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.id_blog = this.activatedRoute.snapshot.paramMap.get('id');
    this.getBlogByID(this.id_blog);
  }

  getBlogByID(id : any ){
    console.log('Get Blog By this Id :',id);
    this.blogService.getBlogById(id).subscribe(
      (result)=>{
        if (result){
          this.blog = result.blog;
        }
        else {
          console.log('error');
        }
      }
    )
  }
}
