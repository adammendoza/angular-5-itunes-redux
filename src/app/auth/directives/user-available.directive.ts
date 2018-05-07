import { Directive, OnInit, OnDestroy, ElementRef, Input } from "@angular/core";
import { Store, Action, select } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
  NG_VALIDATORS, Validator,
  AbstractControl, FormGroupDirective, ControlContainer, ValidationErrors
} from '@angular/forms';

@Directive({
  selector: '[userAvailable]',
  host: { '(input)': 'onInput($event)' }

})
export class UserAvailableDirective implements OnInit, OnDestroy, Validator {
  @Input() userAvailable: string = null;
  @Input() selectUserAvailableErrors: any;
  inputChange$: Subject<string> = new Subject<string>();
  constructor(private elementRef: ElementRef, private _fg: ControlContainer, private store: Store<any>) {
  }
  validate(c: AbstractControl): ValidationErrors {
    return {};
  }
  onInput(event) {
    this.inputChange$.next(event.target.value);
  }


  ngOnInit() {
    this.inputChange$.map(val => { return { username: val, valid: this.form.controls['username'].valid } })
      .filter(val => {
        return val.valid;
      }).debounceTime(300).subscribe(user => {
        this.store.dispatch({ type: this.userAvailable, payload: user.username });
      })
    this.store.select(this.selectUserAvailableErrors).subscribe((val) => {
      if (val) {
        this.elementRef.nativeElement.focus();
        this.form.controls['username'].setErrors({});
      }
    });

  }
  ngOnDestroy() {

  }

  get form() { return this._fg.formDirective ? (this._fg as FormGroupDirective).form : null; }

}