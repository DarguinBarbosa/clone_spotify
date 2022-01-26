import { TrackModel } from './../../../../core/model/tracks.model';
import { observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackService } from '@modules/tracks/services/track.service';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit,OnDestroy {
  tracksTrending:Array <TrackModel> =[]
  tracksRandom:Array <TrackModel> =[]
  listObservable:Array<Subscription> = [] 
  constructor(private service : TrackService) { }
  
  ngOnDestroy(): void {
 
  }

  ngOnInit(): void {
    this.loadData()
}

loadData(){
  this.service.getAllTracks$().subscribe((e:TrackModel[])=>{
    this.tracksTrending = e
  })
  this.service.getAllTrackRamdom$().subscribe((e:TrackModel[])=>{
    this.tracksRandom = e 
  })
}

}
