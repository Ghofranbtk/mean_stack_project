import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  id_user : any ;
  constructor(private router : Router) { }

  ngOnInit(): void {
    this.id_user  = localStorage.getItem("connectedUser");
  }

  logout(){
    localStorage.removeItem("connectedUser");
    this.router.navigate(['']);
  }

  setting(){
    this.router.navigate([`edit-user/${this.id_user}`])
  }

  profil(){
    this.router.navigate([`profile/${this.id_user}`]);
  }

}
