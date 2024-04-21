import { 
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { IAuthorizationForm } from '../../core/interfaces/authorization';
import { AuthorizationService } from '../../core/services/authorization.service';


@Component({
  selector: 'app-auth',
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  public authForm!: FormGroup<IAuthorizationForm>;
  public loginError: boolean = false;
  private _destroyed = new Subject<void>();

  constructor(
    public authService: AuthorizationService,
    private _formBuilder: NonNullableFormBuilder,
    private _router: Router,
  ) { }

  public get emailControl(): FormControl<string> {
    return this.authForm.get('email') as FormControl;
  }

  public get passwordControl(): FormControl<string> {
    return this.authForm.get('password') as FormControl;
  }

  public ngOnInit(): void {
    this._initForm();
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public onLogin(): void {
    if (!this.authForm.valid) {
      return;
    }

    this.authService.logIn({
      email: this.authForm.get('email')!.value,
      password: this.authForm.get('password')!.value,
    }).pipe(
      takeUntil(this._destroyed),
    ).subscribe({
      next: () => {
        this.loginError = false;
        this._router.navigate(['/']);
      },
      error: () => {
        this.loginError = true;
      },
    });
  }

  public onLogout(): void {
    this.authService.logOut();
  }

  private _initForm(): void {
    this.authForm = this._formBuilder.group<IAuthorizationForm>({
      email: this._formBuilder.control({
        value: '',
        disabled: false,
      }, {
        validators: [
          Validators.required,
          Validators.email,
        ],
      }),
      password: this._formBuilder.control({
        value: '',
        disabled: false,
      }, {
        validators: [Validators.required],
      }),
    });
  }
}
