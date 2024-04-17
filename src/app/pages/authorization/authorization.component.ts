import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import { IAuthorizationForm } from '../../core/interfaces/authorization';


@Component({
  selector: 'app-auth',
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationComponent implements OnInit {
  public authForm!: FormGroup<IAuthorizationForm>;

  constructor(
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
