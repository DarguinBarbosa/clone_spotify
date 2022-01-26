import { TrackModel } from './../../core/model/tracks.model';
import { EventEmitter, Injectable } from '@angular/core';
import { TrackService } from '@modules/tracks/services/track.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback :EventEmitter<any>= new EventEmitter<any>()
  private urlMusic = "http://localhost:3001"
  public audio!:HTMLAudioElement
  public  trackInfo:BehaviorSubject<any> = new BehaviorSubject(undefined)
  public tomeElapsed:BehaviorSubject<string> = new BehaviorSubject("00:00")
  public tomeRest:BehaviorSubject<string> = new BehaviorSubject("-00:00")
  public playerStatus:BehaviorSubject<string> = new BehaviorSubject("paused")
  public playerPercentage:BehaviorSubject<number> = new BehaviorSubject(0)
  constructor() {
    this.audio = new Audio()
    this.trackInfo.subscribe(r=>{
      if(r){
        this.setAudio(r)
      }
    })
    this.lisenenAllAudio()
  }

  public setAudio(track:TrackModel){
    this.audio.src = `${this.urlMusic}${track.url}`
    this.audio.play()
  }

  private lisenenAllAudio(){
    this.audio.addEventListener('timeupdate',this.calculateTime,false)
    this.audio.addEventListener('playing',this.setplayerStatus,false)
    this.audio.addEventListener('play',this.calculateTime,false)
    this.audio.addEventListener('pause',this.calculateTime,false)
    this.audio.addEventListener('ended',this.calculateTime,false)
  }
 private  setplayerStatus = (state:any)=> {
  switch (state.type) { //TODO: --> playing
    case 'play':
      this.playerStatus.next('play')
      break
    case 'playing':
      this.playerStatus.next('playing')
      break
    case 'ended':
      this.playerStatus.next('ended')
      break
    default:
      this.playerStatus.next('paused')
      break;
  }
  }

  private calculateTime =() =>{
    const {duration,currentTime} = this.audio
    this.setTimepass(currentTime)
    this.setTimeRemainin(currentTime, duration)
    this.setPercentage(currentTime, duration)
    
  }
  private setTimepass(currentTime:number){
    let seconds= Math.floor(currentTime % 60)
    let minutes = Math.floor((currentTime /60)%60)

    const displaySecond = (seconds < 10) ? `0${seconds}`:seconds
    const displayMinute = (minutes < 10) ? `0${minutes}`:minutes
    const  displayFormat = `${displayMinute}:${displaySecond}`
    this.tomeElapsed.next(displayFormat)
  }


  private setTimeRemainin(currentTime:number, duration:number){
    let timeLeft = duration -currentTime
    let seconds= Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft /60)%60)

    const displaySecond = (seconds < 10) ? `0${seconds}`:seconds
    const displayMinute = (minutes < 10) ? `0${minutes}`:minutes
    const  displayFormat = `${displayMinute}:${displaySecond}`
    this.tomeRest.next(displayFormat)
  }

  public togglePlayer(){
    if(this.audio.paused){
      this.audio.play()
    }
    else{
      this.audio.pause()
    this.setplayerStatus('paused')
    }
  }

  private setPercentage(currentTime:number , duration:number){
    let percentage = (currentTime * 100)/duration
    this.playerPercentage.next(percentage)
  }

  public seekAudio(percentage:number){
    const  {duration} = this.audio
    const percentageSecond =(percentage * duration) /100
    this.audio.currentTime = percentageSecond
  }
}
