import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import * as fromRoot from "./../../ngrx";
import * as reducersCollection from "./../../ngrx/song-collection-reducers";

import { Store, select } from "@ngrx/store";
import * as fromSongCollectionActions from "./../../ngrx/song-collection-actions";
import * as fromSongActions from "./../../ngrx/song-actions";
import { ISong } from "./../../../models/song";

@Component({
  selector: 'manage-tab',
  templateUrl: 'manage-tab.component.html',
  styleUrls:['../styles/style.css']
})
export class ManageTabComponent implements OnInit{
  songs: Observable<any[]>;
  constructor(  private store: Store<reducersCollection.State>
  ){ 

  }

  ngOnInit(){
    this.songs = this.store.pipe(select(fromRoot.getSongCollection));

  }
  
  onRemove(song: any){
    song.pendingRemove = true;
    this.store.dispatch(new fromSongCollectionActions.RemoveSongAction(song.trackId));
  }
}