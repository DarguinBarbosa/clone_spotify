import { SearchService } from './../../services/search.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {
  data1: Observable<any>= of([]);
  constructor(private service:SearchService) { }

  ngOnInit(): void {
  }
  receiveData(even:any){
   this.data1= this.service.searchService$(even)
  }
}
