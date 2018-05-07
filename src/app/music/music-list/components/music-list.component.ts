import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs/Observable";
import * as fromRoot from "./../../ngrx";
import * as reducersCollection from "./../../ngrx/song-collection-reducers";
import { from } from 'rxjs/observable/from';
import { map, flatMap, switchMap } from 'rxjs/operators';
import * as reducersSearchCollection from "./../../ngrx/search-reducers";

import { Store, select } from "@ngrx/store";
import * as fromSongCollectionActions from "./../../ngrx/song-collection-actions";
import * as fromSongActions from "./../../ngrx/song-actions";
import { ISong } from "./../../../models/song";
import { combineLatest } from 'rxjs/observable/combineLatest';

import { zip } from 'rxjs/observable/zip';
import { distinctUntilChanged, filter, withLatestFrom, isEmpty, skipWhile, tap, reduce, scan } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';


@Component({
  selector: 'music-list',
  templateUrl: 'music-list.component.html',
  styleUrls: ['music-list.style.css']
})
export class MusicListComponent {
  @Input()
  songs$: Observable<ISong[]>;

  @Output()
  addEvent = new EventEmitter();

  constructor(private store: Store<reducersSearchCollection.State>,
    private storeCol: Store<reducersCollection.State>) {
  }

}