import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/model/tracks.model';
import * as dataRaw from '../../../data/tracks.json'
import { TrackService } from '@modules/tracks/services/track.service';
@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent implements OnInit {
  @Input() tracks:TrackModel[] = []
  optionSort:{property:string|null, order:string} = {property:null, order:'asc'}
  constructor(private service : TrackService) { }

  ngOnInit(): void {
    const {data} :any  = (dataRaw as any ).default
    this.service.getAllTracks$().subscribe((e:TrackModel[])=>{
      this.tracks = e
    })
  }
  changeSort(property:string):void{



    const {order} = this.optionSort
    this.optionSort = {
      property,
      order:order == 'asc' ? 'desc': 'asc'
    }
  }
}
