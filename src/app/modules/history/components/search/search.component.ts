import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() callBackData: EventEmitter<any> = new EventEmitter()
  src !:string 
 
  constructor() { }

  ngOnInit(): void {
  }
  callSearch(term:any){
    if(term.length >=4){
      this.callBackData.emit(term)
    }
  }
}
