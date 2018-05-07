import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ISong } from "./../../../models/song";
import { BaseSongComponent } from './../../base-song/components/base-song.component';
@Component({
  selector: 'song-detail',
  templateUrl: 'song.component.html',
  styleUrls: ['styles.css']
})
export class SongComponent extends BaseSongComponent{
 
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
 
  @Output() add = new EventEmitter<number>();

  get pending() {
    return this._song.pending;
  }

  get isAddedd(){
    return this.song.isAdded;
  }


  constructor(){ 
    super();
  }

}