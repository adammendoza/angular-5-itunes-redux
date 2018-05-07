import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './materials/material.module';
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule } from "./../auth/auth.module";

import { TopNavComponent } from './components/top-nav.component';
import { MenuComponent } from './menu/components/menu.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, FlexLayoutModule, AuthModule],
  declarations: [TopNavComponent, MenuComponent],
  exports: [TopNavComponent]
})
export class TopNavModule {

}