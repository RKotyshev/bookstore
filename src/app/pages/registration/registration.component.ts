import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import { IRegistrationForm } from '../../core/interfaces/registration';
import { identicalValuesValidator } from '../../core/functions/validators/identical-value-validator';
import { AvailableEmailValidator } from '../../core/functions/validators/available-email-validator';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  public registrationForm!: FormGroup<IRegistrationForm>;
  
  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _availableEmailValidator: AvailableEmailValidator,
  ) {}

  public get emailControl(): FormControl<string> {
    return this.registrationForm.get('email') as FormControl;
  }

  public get passwordControl(): FormControl<string> {
    return this.registrationForm.get('password') as FormControl;
  }

  public get passwordConfirmControl(): FormControl<string> {
    return this.registrationForm.get('passwordConfirm') as FormControl;
  }

  public ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.registrationForm = this._formBuilder.group<IRegistrationForm>({
      email: this._formBuilder.control({
        value: '',
        disabled: false,
      }, {
        validators: [
          Validators.email,
          Validators.required,
        ],
        asyncValidators: [this._availableEmailValidator.validate.bind(
          this._availableEmailValidator,
        )],
        updateOn: 'blur',
      }),
      password: this._formBuilder.control({
        value: '',
        disabled: false,
      },
      {
        validators: [Validators.required],
      }),
      passwordConfirm: this._formBuilder.control({
        value: '',
        disabled: false,
      }, {
        validators: [Validators.required],
      }),
    }, {
      validators: [identicalValuesValidator('password', 'passwordConfirm')],
    });
  }
}
