import { Routes } from "@angular/router";
import { MusicComponent } from "./components/music.component";
import { ManageTabComponent } from "./manage-tab/components/manage-tab.component";
import { ItunesSearchComponent } from "./itunes-search-tab/components/itunes-search-tab.component";
import { AuthGuard } from './../auth/services/auth-guard.service';

export const musicRoutes : Routes = [
  {
    path: '', component: MusicComponent,
    children: [
      { 
        path: 'itunes-search', component: ItunesSearchComponent
      },
      { 
        path: 'manage', component: ManageTabComponent
      },
      {
        path: '', redirectTo: 'itunes-search', pathMatch: 'full'
      },
    ]
  }
];  