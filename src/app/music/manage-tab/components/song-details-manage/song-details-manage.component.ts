import { Component, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { ISong } from "./../../../../models/song";
import { BaseSongComponent } from './../../../base-song/components/base-song.component';
@Component({
  selector: 'song-details-manage',
  templateUrl: 'song-details-manage.component.html',
  styleUrls: ['styles.css']
})
export class SongDetailsManageComponent extends BaseSongComponent implements OnDestroy {

  _song: ISong;

  @Input()
  set song(song: ISong) {
    this._song = song;
  }
  get song() {
    if (this._song)
      return this._song;
    else
      return {} as ISong;
  }

  @Output() remove = new EventEmitter<number>();

  get pendingRemove() {
    return this._song.pendingRemove;
  }

  constructor() {
    super();
  }
  ngOnDestroy() {
    this.song.isAdded = false;
  }

  ngOnInit() {

    this.song.isAdded = true;
  }

}