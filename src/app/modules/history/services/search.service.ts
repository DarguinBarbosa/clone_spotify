import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
   URL= environment.api
  constructor(private httpclient:HttpClient) { }


  searchService$(term:any){
    return this.httpclient.get<any>(`${this.URL}/tracks?src=${term}`).pipe(
      map((e)=>e.data)
    )
  }
}
