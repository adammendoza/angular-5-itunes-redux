import { NgModule } from '@angular/core';
import { Store } from "@ngrx/store";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { FlexLayoutModule } from '@angular/flex-layout';
import { EffectsModule } from "@ngrx/effects";

import { AuthModule } from './auth/auth.module';
import { TopNavModule } from './top-nav/top-nav.module';
import { MusicModule } from './music/music.module';
import { AuthEffectsService } from './auth/ngrx/auth-effects.service';
import { AppEffectsService } from './root-redux/app-effects.service';
import { rootRoutes } from './app.routes';
import { CustomRouterStateSerializer } from "./utils/custom-router-state-serializer";
import { environment } from './../environment/environment';

import { AppComponent } from './app.component';
import { reducers } from './root-redux/reducers'; 
import { metaReducers } from './root-redux/meta-reducer';


@NgModule({ 
  imports: [
    BrowserModule,
    HttpModule, 
    AuthModule.forRoot(),
    TopNavModule, 
    BrowserAnimationsModule,
    FlexLayoutModule,
    EffectsModule.forRoot([AppEffectsService]),
    StoreModule.forRoot(reducers, { metaReducers }),
    RouterModule.forRoot(rootRoutes, {useHash: true}) 
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ] 
})
export class AppModule {
  constructor(private store: Store<any>){
        store.select(s => s).subscribe(console.log.bind(console));

  }
 }
 