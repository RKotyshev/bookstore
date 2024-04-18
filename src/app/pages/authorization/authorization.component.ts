import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import { IAuthorizationForm } from '../../core/interfaces/authorization';
import { AuthorizationService } from '../../core/services/authorization.service';


@Component({
  selector: 'app-auth',
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationComponent implements OnInit {
  public authForm!: FormGroup<IAuthorizationForm>;

  constructor(
    public authService: AuthorizationService,
    private _formBuilder: NonNullableFormBuilder,
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

  public onLogin(): void {
    if (!this.authForm.valid) {
      return;
    }

    this.authService.logIn({
      email: this.authForm.get('email')!.value,
      password: this.authForm.get('password')!.value,
    });
  }

  // public onSignUp(): void {}

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
