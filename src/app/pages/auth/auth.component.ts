import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import { IAuthForm } from '../../core/interfaces/auth';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  public authForm!: FormGroup<IAuthForm>;

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
    this.authForm = this._formBuilder.group<IAuthForm>({
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
