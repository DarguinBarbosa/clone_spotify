import { TrackModel } from './../../../core/model/tracks.model';
import { Injectable } from '@angular/core';
import { observable, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {catchError, map,mergeMap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private readonly URL = environment.api
  // dataTracksTrending$:Observable<TrackModel[]>=of([])
  // dataTracksRandom$:Observable<TrackModel[]>=of([])
  constructor(private client:HttpClient) { 
  }

  getAllTracks$():Observable<any>{
    return this.client.get<any>(`${this.URL}/tracks`).pipe(
      map(e=>{
        return e.data
      })
    )
  }

  private skipByid(listTracks:TrackModel[], id:number):Promise<TrackModel[]>{
    return new Promise((resolve, reject)=>{
      console.log(listTracks)
      const listTmp = listTracks.filter(a=>a._id !== id)
      resolve(listTmp)
    })
  }
  getAllTrackRamdom$():Observable<any>{
    return this.client.get<any>(`${this.URL}/tracks`).pipe(
      mergeMap(e=>this.skipByid(e.data,8)),
      // map(data=>{
      //   console.log(data)
      //  return data.filter((i:TrackModel)=> i._id !== 8)
      // }),
    catchError((err)=>{
      console.log('Algo salio mal :C')
      return of([])
    })
      )
  }
}
