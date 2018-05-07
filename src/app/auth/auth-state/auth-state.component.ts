import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { IUser } from "./../../models/user"


@Component({
  selector: 'auth-state',
  templateUrl: 'auth-state.component.html'
})
export class AuthStateComponent {

  @Output('logout') logoutEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input('authState') currentAuthState: { loggedIn: boolean, currentUser: IUser } | null;

  logout() {
    this.logoutEvent.emit();
  }
}
