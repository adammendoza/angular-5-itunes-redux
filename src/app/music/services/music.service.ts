import { Injectable } from "@angular/core";
import { Jsonp, Response, Http, URLSearchParams } from "@angular/http";
import { API_LINKS } from './../shared/utils';
import { ISong } from "./../../models/song";
import { map } from 'rxjs/operators';
import { AuthService } from './../../auth/services/auth.service';

import { Observable } from "rxjs/Observable";
@Injectable()
export class MusicService {

  constructor(
    private jsonp: Jsonp, private authService: AuthService, private http: Http
  ) {
  }

  search(query: string): Observable<ISong[]> {
    const searchLinkWithParams = `${API_LINKS.MUSIC.SEARCH.link}?term=${query}&media=music&limit=200&callback=JSONP_CALLBACK`;
    return this.jsonp.request(searchLinkWithParams)
      .pipe(map(res => res.json().results.map(val => {
        return val;
      })));
  }

  lookupSong(trackId: number): Observable<ISong> {
    const lookupLinkWithParams = `${API_LINKS.MUSIC.LOOKUP.link}?id=${trackId}&callback=JSONP_CALLBACK`;
    return this.jsonp.request(lookupLinkWithParams)
      .pipe(
      map(res => res.json().results)
      );
  }

  addSongToCollection(trackId: number): Observable<any> {
    return this.http.post('/api/music/song', { trackId: trackId, username: this.authService.username }).pipe(map(res => res.json()));
  }

  removeSongInCollection(trackId: number): Observable<any> {
    let params = new URLSearchParams();
    params.set('trackId', `${trackId}`);
    params.set('username', this.authService.username);
  
    return this.http.delete('/api/music/song', {params}).pipe(map(res => res.json()));
  }
}