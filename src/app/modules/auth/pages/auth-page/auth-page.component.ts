import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  formLogin:FormGroup  = new FormGroup ({})
  constructor(private fb : FormBuilder, private service:AuthService, private cookie:CookieService, private router :Router) {
    this.formLogin = fb.group({
      email:['',Validators.compose([Validators.required, Validators.email])],
      password:['',Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(12)])]
    })
   }

  ngOnInit(): void {
  
  }
  
  sendLogin(){
    const body = this.formLogin.value
    this.service.sendCredentials(body).subscribe(e=>{
      this.router.navigate(['/tracks'])
    },err=>{
      console.log(err.error.error)
    })
  }
}
