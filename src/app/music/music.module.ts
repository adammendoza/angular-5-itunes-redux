import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './materials/material.module';
import { RouterModule } from "@angular/router";
import { StoreModule } from '@ngrx/store';
import { JsonpModule } from "@angular/http";
import { EffectsModule } from "@ngrx/effects";
import { musicRoutes } from "./music.routes";
import { AuthGuard } from "./../auth/services/auth-guard.service";
import { SongComponent } from './song-details/components/song.component';
import { MusicListComponent } from './music-list/components/music-list.component';
import { MusicComponent } from "./components/music.component";
import { SearchMusicComponent } from "./search-music/components/search-music.component";
import { ManageTabComponent } from './manage-tab/components/manage-tab.component';
import { ItunesSearchComponent } from './itunes-search-tab/components/itunes-search-tab.component';
import { MusicService } from './services/music.service';
import { SongEffectService } from "./ngrx/song-effect.service";
import { reducers } from './ngrx';
import { fakeBackendProvider } from './../auth/services/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { BaseSongComponent } from './base-song/components/base-song.component';
import { SongDetailsManageComponent } from './manage-tab/components/song-details-manage/song-details-manage.component';
import { PaginationComponent } from "./shared/pagination/pagination.component";

@NgModule({ 
  imports: [ 
    CommonModule,
    MaterialModule,
    JsonpModule, 
    RouterModule.forChild(musicRoutes),
    EffectsModule.forFeature([SongEffectService]),
    StoreModule.forFeature('musicState', reducers)

  ],
  declarations: [
    MusicListComponent,
    SongComponent,
    MusicComponent,
    SearchMusicComponent,
    ManageTabComponent,
    ItunesSearchComponent,
    BaseSongComponent,
    SongDetailsManageComponent,
    PaginationComponent
  ],
  
  providers: [MusicService,
  fakeBackendProvider,
        MockBackend,
        BaseRequestOptions],
  exports: [MusicComponent]
})
export class MusicModule {

}
 