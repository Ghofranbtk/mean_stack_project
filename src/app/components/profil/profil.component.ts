import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user:any;
  id:any;
  constructor(private userService:UserService,
              private router:Router,
              private activatedRoute:ActivatedRoute
              ) { }

  ngOnInit(): void {
  //  const id  = localStorage.getItem("connectedUser");
  this.id = this.activatedRoute.snapshot.paramMap.get('id');
  this.getUser(this.id);
  // console.log('Here In Get User In Profil');
  // this.userService.getUserById(this.id).subscribe(
    // (data)=>{
      // this.user = data.user;
    // }
  // )
  console.log('id :',this.id);
  console.log('user:',this.user);
  if ( this.user == undefined){
    console.log('chof 7al lro7ek ');
  }
  }

  getUser(id : any){
    console.log('Here In Get User In Profil');
    this.userService.getUserById(id).subscribe(
      (data)=>{
        this.user = data.user;
        console.log('this is user :',this.user);
      }
    )

  }
  

  EditUser(id : any){
    this.router.navigate([`edit-user/${id}`])
  }


  Logout(){
    localStorage.removeItem("connectedUser");
    this.router.navigate(['']);
  }



}
