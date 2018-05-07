import {
  Component, EventEmitter, Output,
  OnInit, Input
} from "@angular/core";
import {
  FormsModule, ReactiveFormsModule,
  FormGroup, FormControl, Validators
} from "@angular/forms";
import { IUser } from '../../models/user';
import { ErrorMatcher } from "./../validators/error.validator";


@Component({
  selector: 'login-form',
  templateUrl: "login-form.component.html",
  styleUrls: ['login-form.styles.css']

})
export class LoginFormComponent implements OnInit {
  errorMatcher = new ErrorMatcher();
  signInForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  private _pending = false;
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.signInForm.disable();
    } else {
      this.signInForm.enable();
    }

    this._pending = isPending;
  }

  get pending() {
    return this._pending;
  }

  @Input() errorMessage: string | null;

  @Output('loginEvent') formSubmitted: EventEmitter<IUser> = new EventEmitter<IUser>();
  ngOnInit() {

  }
  reset() {
    this.errorMessage = null;
    this.signInForm.reset();
  }
  submit() {
    if (this.signInForm.valid) {
      console.log(this.signInForm.value);
      this.formSubmitted.emit(this.signInForm.value);
      console.log("form valid")
    }
  }
}