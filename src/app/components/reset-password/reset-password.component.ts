import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  submitted = false;
  resetPasswordForm: FormGroup = new FormGroup({
    password: new FormControl(''),
    passwordConfirmation: new FormControl('')
    
  });
  user : any ;
  msg : String = "";
  constructor(private userService: UserService,
     private route: ActivatedRoute,
      private router: Router,
      private fb:FormBuilder) { }

  ngOnInit(): void {
      this.resetPasswordForm = this.fb.group({
        password: [''],
        passwordConfirmation: [''],
        
    })
    this.getUser();
  }

  getUser(){
    const token = localStorage.getItem("forgotPassword");
    this.userService.getUserByEmail(token).subscribe(
      (data)=>{
        console.log('this is user',data.user);
        this.user = data.user ;
      }
    )
  }

  reset(){
    var val = this.valide();
    console.log(val);
    console.log('haha',this.resetPasswordForm.value.password);
    if (val == false){
      console.log('error');
    }
    else{
      this.user.pwd = this.resetPasswordForm.value.password;
      this.userService.editUser(this.user).subscribe(
        (data)=>{
          console.log(data.message);
          this.router.navigate(['account']);
        }
      )
    }
  }

  valide(){
    var y = this.validatePassword(this.resetPasswordForm.value.password);
    var valid = true;
    if (y == false){
      this.msg = "Password between 7 to 16 characters : only characters, numeric digits, underscore and first character must be a letter ";
      valid = false ;
    }
    else if(this.resetPasswordForm.value.password!=this.resetPasswordForm.value.passwordConfirmation){
      this.msg="Please confirm your password";
      valid = false;
    }
    else{
      valid = true;
    }
   return valid
  }

  validatePassword(pwd: String) {
    const passw = /^[A-Za-z]\w{7,14}$/;
    return passw.test(String(pwd.toLocaleLowerCase()));
  }

  passwordConfirmationn(group: AbstractControl): { [key: string]: any } | null {
    const password = group.get('password');
    console.log('pwd',password);
    const passwordConfirmation = group.get('passwordConfirmation');
    if (password?.pristine || passwordConfirmation?.pristine) {
      return null;
    }
    return password && passwordConfirmation && password.value !== passwordConfirmation.value ? { 'mismatch': true } : null
  }

}
