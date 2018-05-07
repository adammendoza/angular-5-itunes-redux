import {
  Component, EventEmitter, Output, Input,
  OnInit
} from "@angular/core";
import {
  FormsModule, ReactiveFormsModule, EmailValidator,
  FormGroup, FormControl, Validators
} from "@angular/forms";
import { ISignupUser } from '../../models/user';


@Component({
  selector: 'signup-form',
  templateUrl: "signup-form.component.html",
  styleUrls: ['signup-form.styles.css']
})
export class SignupFormComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.email])
  });
  @Output('signUpEvent') formSubmitted: EventEmitter<ISignupUser> = new EventEmitter<ISignupUser>();
  @Output('resetFormEvent') resetForm: EventEmitter<ISignupUser> = new EventEmitter<ISignupUser>();

  private _pending = false;
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.signUpForm.disable();
    } else {
      this.signUpForm.enable();
    }
    this._pending = isPending;
  }

  @Input() actionUserAvailable: any;
  @Input() selectUserAvailable: any;


  @Input() pendingSearchUser = false;

  get pending() {
    return this._pending;
  }

  ngOnInit() {
  }

  @Input()
  errorMessage: string | null;

  @Input()
  searchUserError: string | null;

  submit() {
    if (this.signUpForm.valid) {
      this.formSubmitted.emit(this.signUpForm.value);
    }
  }

  reset() {
    this.errorMessage = null;
    this.signUpForm.reset();
    this.resetForm.emit();
  }
}