import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: any = {};
  id: any;
  msg: String = '';
  find_user: any;
  ok_password: any;
  message = true;
  signupForm: FormGroup = new FormGroup({
    fnmae: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    pwd: new FormControl(''),
    confirm_pwd: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    phone: new FormControl(''),
    postcode: new FormControl('')
    // check: new FormControl('')
  });

  connectedUser: any = {};
  msgError: string = "";
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    pwd: new FormControl('')
  });

  constructor(private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fname: [''],
      lname: [''],
      email: [''],
      pwd: [''],
      confirm_pwd: [''],
      postcode: [''],
      city: [''],
      country: [''],
      phone: [''],

    })

    this.loginForm = this.formBuilder.group({
      email: [''],
      pwd: ['']
    });

  }

  signup() {

    console.log('Here user', this.user);
    var element = <HTMLInputElement>document.getElementById("checkbox");
    var isChecked = element.checked;
    var val = this.checkData(this.user);
    console.log('testing :', isChecked);
    if (val == true) {
      this.userService.signUp(this.user).subscribe(
        (data) => {
          console.log('Here data from BE after add user', data.message);

          if (data.message == "0") {
            console.log('Email Exist Deja !');
            this.msg = "Email used !";
          }
          else {
            console.log('aplication ', data.id);
            localStorage.setItem('connectedUser', (data.id));
            this.router.navigate([`profile/${data.id}`]);
          }
        }
      )
    }
    else {

      console.log('error');
    }


  }

  checkData(user: any) {
    var element = <HTMLInputElement>document.getElementById("checkbox");
    var isChecked = element.checked;
    var valid = true;
    var x = this.validateEmail(this.user.email);
    var y = this.validatePassword(this.user.pwd);
    if (user.fname == undefined || user.lname == undefined) {
      this.msg = "Name is Required !";
      valid = false;
    }
    else if (x == false) {
      this.msg = "Please check you Email !";
      valid = false;
    }
    else if (y == false) {
      this.msg = "Password between 7 to 16 characters : only characters, numeric digits, underscore and first character must be a letter ";
      valid = false;
    }
    else if (user.confirm_pwd != user.pwd) {
      console.log('confirm pwd', user.confirm_pwd);
      this.msg = "Please confirm your password !";
      valid = false;
    }
    else if (user.city == undefined) {
      this.msg = "City is Required !";
      valid = false;
    }
    else if (user.country == undefined) {
      this.msg = "Country is Required !";
      valid = false;
    }
    else if (user.postcode == undefined) {
      this.msg = "Postcode is Required !";
      valid = false;
    }
    else if (user.phone == undefined) {
      this.msg = "Phone Number is Required !";
      valid = false;
    }
    else if (isChecked == false) {
      this.msg = "Please Accept the Pivacy Policy";
      valid = false
    }


    return valid;
  }



  Login() {
    console.log('Here my user ', this.user);
    this.userService.logIn(this.user).subscribe(
      (data) => {
        console.log('Data after login', data);

        if (data.message == '0') {
          this.ok_password = false;
          this.msgError = 'Please Check your email';
        } else if (data.message == '1') {
          this.msgError = 'Please Check your PWD';
        } else {

          console.log('Name: ', data);
          this.id = data.name;
          localStorage.setItem('connectedUser', (data.name));
          const token = localStorage.getItem("token");
          if (token == null) {
            this.router.navigate([`profile/${data.name}`]);
          }
          else {

            this.router.navigate(['']);
          }
          this.router.navigate(['']);

        }

      }
    );
  }

  validatePassword(pwd: String) {
    const passw = /^[A-Za-z]\w{7,14}$/;
    return passw.test(String(pwd.toLocaleLowerCase()));
  }

  validateEmail(email: string) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }

  forgot() {

    console.log('here in forgot Password ', this.user.email);
    if (this.user.email == undefined || this.user.email == "") {
      this.msgError = "Please Verify your email !";
      this.message = false;
    }
    else {
      this.userService.getUserByEmail(this.user.email).subscribe(
        (data) => {

          this.find_user = data.user;
          console.log(data.message);
          if (data.message != "user not finding") {
            this.message = true;
            this.userService.forgotPassword(this.find_user).subscribe(
              (response: any) => {
                console.log('An e-mail was sent to' + this.find_user.email + 'Please check your mailbox.');
                localStorage.setItem('forgotPassword', (this.user.email));

              },
              (error) => {
                this.message = false;
                console.log(error);
              }
            )
          }
          else {
            this.message = false;
          }
        }
      )
    }



  }
}
