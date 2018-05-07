import { NgModule, ModuleWithProviders } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LoginComponent } from './components/login.component';
import { AuthEffectsService } from './ngrx/auth-effects.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./materials/material-module.module";
import { LoginFormComponent } from "./login-form/login-form.component";
import { SignupFormComponent } from './signup-form/signup-form.component';
import { SignupComponent } from './components/signup.component';
import { AuthStateComponent } from "./auth-state/auth-state.component";
import { CheckPropertyDirective, ErrorTypeDirective } from './directives/check-property.directive';
import { UserAvailableDirective } from "./directives/user-available.directive";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./ngrx";
import { fakeBackendProvider } from './services/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    LoginComponent,
    LoginFormComponent,
    SignupFormComponent,
    SignupComponent,
    AuthStateComponent,
    CheckPropertyDirective,
    ErrorTypeDirective,
    UserAvailableDirective
  ],
  exports: [LoginComponent, SignupComponent, AuthStateComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [
        AuthService,
        AuthGuard,
        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions]
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    EffectsModule.forFeature([AuthEffectsService]),
    StoreModule.forFeature('authState', reducers),
  ]
})
export class RootAuthModule {

}
