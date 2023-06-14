import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { PanierService } from 'src/app/services/panier.service';
import { WhishlistService } from 'src/app/services/whishlist.service';

@Component({
  selector: 'app-home-blog',
  templateUrl: './home-blog.component.html',
  styleUrls: ['./home-blog.component.css']
})
export class HomeBlogComponent implements OnInit {
  blog : any ;
  constructor(private blogService : BlogService,
              private panierService : PanierService,
              private whislistService : WhishlistService,
              private router : Router) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(){
    this.blogService.GetHomeBlog().subscribe(
      (data)=>{
        this.blog = data.blogs
      }
    )
  }

  ShowDetails (id :any) {
    console.log('Show Details of blog :');
    this.router.navigate([`view-blog/${id}`]);
  }

}
