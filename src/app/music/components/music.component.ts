import { Component, OnInit } from "@angular/core";
import { navLinks } from "./../shared/utils";
import * as reducers from "./../ngrx";
import * as reducersCollection from "./../ngrx/song-collection-reducers";

import { Store, select } from "@ngrx/store";
import * as fromSongCollectionActions from "./../ngrx/song-collection-actions";
import * as fromSongActions from "./../ngrx/song-actions";
import * as fromAuthRoot from "./../../auth/ngrx";



@Component({
  selector: 'music',
  templateUrl: 'music.component.html'
})
export class MusicComponent {
  navLinks = navLinks;
  constructor(private store: Store<reducersCollection.State>){
    this.store.select(fromAuthRoot.getCurrentUser).subscribe(val=>{
      if(val && val['songCollection'] && val['songCollection'].length > 0){
        this.store.dispatch(new fromSongCollectionActions.LoadAction(val['songCollection'].map(song => {return {trackId: song} } )));
      }
    })  
  }
}