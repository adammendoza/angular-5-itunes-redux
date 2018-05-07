import { Directive, ElementRef, Renderer2, OnDestroy, ViewContainerRef, TemplateRef, Input, Host, OnInit } from "@angular/core";
import { AbstractControl, ControlContainer, FormGroupDirective } from "@angular/forms";
import { Observable, Subscription } from 'rxjs/Rx';

@Directive({
  selector: '[checkProperty]'
})
export class CheckPropertyDirective implements OnInit, OnDestroy {
  @Input() checkProperty: string;
  control: AbstractControl;
  hasView = false;
  controlValue$: Observable<any>;
  controlSubscription: Subscription;
  hasSubmitted: boolean;

  constructor(private _fg: ControlContainer,
    private _elRef: ElementRef,
    private renderer: Renderer2) {

  }
  ngOnInit() {
    this.control = this.form.get(this.checkProperty);
    let formSubmit$ = (<FormGroupDirective>this._fg).ngSubmit.map(() => {
      this.hasSubmitted = true;
    }).takeWhile((val) => this.hasSubmitted === false);
    this.controlValue$ = Observable.merge(this.control.valueChanges, Observable.of(''), formSubmit$);
    this.controlSubscription = this.controlValue$.subscribe(() => {
      this.setVisible();
    });
  }

  private setVisible() {
    if (this.control.invalid && (this.control.dirty || this.hasSubmitted)) {
      this.renderer.removeStyle(this._elRef.nativeElement, 'display');
    } else {
      this.renderer.setStyle(this._elRef.nativeElement, 'display', 'none');
    }
  }

  ngOnDestroy() {
    if (this.controlSubscription)
      this.controlSubscription.unsubscribe();
  }

  match(error: string): boolean {
    if (this.control && this.control.errors) {
      return Object.keys(this.control.errors).indexOf(error) > -1;
    }
    return false;
  }

  get form() { return this._fg.formDirective ? (this._fg as FormGroupDirective).form : null; }
}

@Directive({
  selector: '[errorType]'
})
export class ErrorTypeDirective implements OnInit {
  @Input() errorType: string;
  isViewActivated = false;
  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<Object>, @Host() private checkPropertyDirective: CheckPropertyDirective) { }

  ngOnInit() {
    this.checkPropertyDirective.controlValue$.subscribe(() => {
      this.setVisible();
    })
  }

  setVisible() {
    if (this.checkPropertyDirective.match(this.errorType)) {
      if (!this.isViewActivated) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.isViewActivated = true;
      }
    } else {
      if (this.isViewActivated) {
        this.viewContainerRef.clear();
        this.isViewActivated = false;
      }
    }
  }
}