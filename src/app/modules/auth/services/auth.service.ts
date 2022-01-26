import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = environment.api
  constructor(private httpclient:HttpClient, private cookie: CookieService) { }

  sendCredentials(body:any):Observable<any>{
    return this.httpclient.post(`${this.URL}/auth/login`,body).pipe(
      tap((resp:any)=>{
        const {tokenSession,data} = resp
        this.cookie.set('you session',tokenSession,1,'/')
      })
    )
  }
}
