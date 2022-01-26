import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/model/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit,OnDestroy {
  @ViewChild('progressBar') progressBar:ElementRef = new ElementRef('')
  listObserbale : Array<Subscription>=[]
  state:string = "paused"
  constructor(private service:MultimediaService,public MultimediaService:MultimediaService) { }
  
  ngOnDestroy(): void {
   this.listObserbale.forEach(e =>e.unsubscribe)
  }

  ngOnInit(): void {
    const  observe1 = this.service.playerStatus.subscribe(r=>{
      this.state = r
      console.log(this.state)
    })
    this.listObserbale=[observe1]
  }

  handlePosition(even:MouseEvent){
    const elNative:HTMLElement = this.progressBar.nativeElement
    const {clientX}= even
    const {x , width} = elNative.getBoundingClientRect()
    const clicX= clientX - x
    const percentageFromX= (clicX*100)/width
    this.MultimediaService.seekAudio(percentageFromX)
  }
}
