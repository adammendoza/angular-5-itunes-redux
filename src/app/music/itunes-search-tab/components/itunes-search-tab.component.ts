import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import * as fromRoot from "./../../ngrx";
import * as fromPager from "./../../ngrx/pagination-actions";
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
  selector: 'itunes-search',
  templateUrl: 'itunes-search-tab.component.html',
  styleUrls: ["styles.css"]
})

export class ItunesSearchComponent implements OnInit {
  songs$ = this.store.pipe(select(fromRoot.getSearchResults));
  songCollection$: Observable<any> = this.store.pipe(select(fromRoot.getSongCollection));
  pending$: Observable<boolean> = this.store.pipe(select(fromRoot.getSongStatusPending));
  trackId$: Observable<number> = this.store.pipe(select(fromRoot.getSongStatusTrackId));
  displayedSongs$ = this.store.select(fromRoot.getDisplayedItems);
  collectionIds$: Observable<number[]> = this.store.pipe(select(fromRoot.getCollectionIds));
  perPage = this.store.pipe(select(fromRoot.getPerPage));
  currentPage = this.store.pipe(select(fromRoot.getCurrentPage));
  combineAdded$: Observable<any>;
  combineAdd$: Observable<any>;
  filterByProperty: (array: Observable<any[]>, trackId: number, pending: boolean) => Observable<any>;
  setPending: (song: Observable<any>, pending: boolean) => Observable<any>;

  searchLoading = this.store.pipe(select(fromRoot.getSearchSongLoading));

  constructor(private store: Store<fromRoot.State>) {

  }
  onMusicSearch(query: string) {
    this.store.dispatch(new fromSongActions.SongSearchAction(query));
  }
  onNext(next: boolean) {
    if (next)
      this.store.dispatch(new fromPager.NextPageAction());
  }

  onPrevious(prev: boolean) {
    if (prev)
      this.store.dispatch(new fromPager.PreviousPageAction());
  }
  onPage(page: number) {
    this.store.dispatch(new fromPager.GoToPageAction({ page }));
  }

  add(trackId) {
    this.store.dispatch(new fromSongCollectionActions.AddSongAction({ trackId }));
  }

  ngOnInit() {
    this.filterByProperty = (array: Observable<any[]>, trackId: number, pending: boolean) => {
      return array.filter(element => element['trackId'] === trackId).switchMap(song => this.setPending(of(song), pending));
    };
    this.setPending = (song: Observable<any>, pending: boolean) => {
      return song.do(song => song.pending = pending);
    };

    //this works just one time add
    // this.combined = combineLatest(this.pending$, this.songs$).withLatestFrom(this.trackId$).map(combinedStream => {
    //   console.log("first map Comb",combinedStream )
    //   return { trackId: combinedStream[1], pending: combinedStream[0][0], songs: combinedStream[0][1] };
    // }).filter(combinedStream => {
    //   return combinedStream.trackId && combinedStream.songs.length > 0;
    // }).switchMap(combinedStream => { 
    //   return this.filterByProperty(from(combinedStream.songs), combinedStream.trackId);
    // })

    this.combineAdd$ = combineLatest(this.trackId$, this.pending$).map(combinedStream => {
      return { trackId: combinedStream[0], pending: combinedStream[1] };
    }).filter(combinedStream => {
      return combinedStream.trackId !== null;
    }).switchMap(combinedStream => {
      return this.songs$.map(songs => {
        return songs.find(song => song['trackId'] === combinedStream.trackId);
      }).filter(elem => elem !== undefined).do(elem => {
        elem['pending'] = combinedStream.pending;
      });
    })
    //works with multiple add requests
    //  this.combined = combineLatest(this.trackId$, this.pending$).withLatestFrom(this.songs$).map(combinedStream => {
    //     console.log("first map Comb",combinedStream )
    //     return { trackId: combinedStream[0][0], pending: combinedStream[0][1], songs: combinedStream[1] };
    //   }).filter(combinedStream => {
    //     return combinedStream.trackId && combinedStream.songs.length > 0;
    //   }).switchMap(combinedStream => { 
    //     return this.filterByProperty(from(combinedStream.songs), combinedStream.trackId, combinedStream.pending);
    //   })
    // this.combineAdded$ = this.collectionIds$
    // .map(combinedAdded => {return { addedSongs: combinedAdded}})
    // .skipWhile(combineAddded => combineAddded.addedSongs.length === 0)
    // .switchMap(combineAdded => of(...combineAdded.addedSongs))
    // .switchMap(id => {
    //   return this.songs$.switchMap(songs=>{
    //     return of(...songs);
    //   }).filter(val=>{
    //     return !val['added'];
    //     }).filter(val=>{
    //       return val['trackId'] === id;
    //   });
    // });

    // this.combineAdded$.subscribe(val=> {
    //   //val.isAdded = true;//REMOVED BY ME 
    // });
    // this.combineAdded$.subscribe();
    this.combineAdd$.subscribe();

    combineLatest(this.songCollection$, this.songs$).pipe(
      map(val => {
        return { songs: val[1], collectionIds: val[0].map(song => song.trackId) }
      }),
      skipWhile(comb => comb.collectionIds.length === 0 || comb.songs.length === 0),

      tap(val => {
        val.songs.reduce((prev, cur) => {
          if (val.collectionIds.indexOf(cur.trackId) > -1) {
            prev.push(cur);
            cur.isAdded = true;
          } else {
            cur.isAdded = false;
          }
          return prev;
        }, []);

      })
    ).subscribe();
  }
}