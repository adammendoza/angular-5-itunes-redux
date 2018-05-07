import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ISong } from "./../../../models/song";

@Component({
  selector: 'song-base',
  templateUrl: 'base-song.component.html',
  styleUrls: ['../styles/styles.css']
})
export class BaseSongComponent{
  _song: ISong;

  @Input()
  set song(song: ISong){
    this._song = song;
  }
  get song(){
    if(this._song)
      return this._song;
    else
      return {} as ISong;
  }

  get trackId() {
    return this.song.trackId;
  }

  get trackCensoredName() {
    return this.song.trackCensoredName;
  }

  get collectionCesoredName() {
    return this.song.collectionCensoredName;
  }

  get collectionPrice() {
    return this.song.collectionPrice;
  }

  get releaseDate() { 
    return this.song.releaseDate;
  }

  get artworkUrl100(){
    return this.song.artworkUrl100;
  }

  get collectionViewUrl() {
    return this.song.collectionViewUrl;
  }
  
  constructor(){ 
  }

}