import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogUrl: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  AddBlog(blog:any , img :File) {
    let formData = new FormData();
    formData.append('title',blog.title);
    formData.append('author',blog.author);
    formData.append('description1',blog.description1);
    formData.append('img',img);
    formData.append('quote',blog.quote);
    formData.append('description2',blog.description2);
    formData.append('date',blog.date);
    return this.httpClient.post<{message:any , blog : any}>(`${this.blogUrl}/api/blog/add`,formData);
   }

   AdBlog(blog:any , imgg : File){
    let formData = new FormData();
    formData.append('title',blog.title);
    formData.append('author',blog.author);
    formData.append('description1',blog.description1);
    formData.append('img',blog.img);
    formData.append('quote',blog.quote);
    formData.append('description2',blog.description2);
    formData.append('imgg',imgg);
    formData.append('date',blog.date);
    return this.httpClient.post<{message:String}>(`${this.blogUrl}/api/blog/upload`,formData );

   }

   deleteBlog(id:any){
    return this.httpClient.delete<{message:string}>(`${this.blogUrl}/api/blog/delete/${id}`);
  }

  GetHomeBlog(){
    return this.httpClient.get<{blogs:any}>(`${this.blogUrl}/api/blog/home-blog`);
  }

  getAllBlogs(){
    return this.httpClient.get<{blogs:any}>(`${this.blogUrl}/api/blog/blogs`);
  }

  getBlogById(id:any){
    return this.httpClient.get<{blog:any}>(`${this.blogUrl}/api/blog/${id}`);
  }

  EditBlog(blog:any) {
    return this.httpClient.put<{message:String}>(`${this.blogUrl}/api/blog/editing/${blog._id}`,blog);
  }

  EditBlog1(blog:any,img:File) {
    let formData = new FormData();
    formData.append('title',blog.title);
    formData.append('author',blog.author);
    formData.append('description1',blog.description1);
    formData.append('img',img);
    formData.append('quote',blog.quote);
    formData.append('description2',blog.description2);
    formData.append('imgg',blog.imgg);
    formData.append('date',blog.date);
    return this.httpClient.put<{message:String , blog : any}>(`${this.blogUrl}/api/blog/edit1/${blog._id}`,formData);
  }

  EditBlog2(blog:any,imgg:File) {
    let formData = new FormData();
    formData.append('title',blog.title);
    formData.append('author',blog.author);
    formData.append('description1',blog.description1);
    formData.append('img',blog.img);
    formData.append('quote',blog.quote);
    formData.append('description2',blog.description2);
    formData.append('imgg',imgg);
    formData.append('date',blog.date);
    return this.httpClient.put<{message:String}>(`${this.blogUrl}/api/blog/edite2/${blog._id}`,formData );
  }

}
