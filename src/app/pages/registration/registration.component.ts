import { 
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject, finalize, takeUntil } from 'rxjs';

import { RegistrationService } from '../../core/services/registration.service';
import { IRegistrationForm } from '../../core/interfaces/registration';
import { identicalValuesValidator } from '../../core/functions/validators/identical-value-validator';
import { AvailableEmailValidator } from '../../core/functions/validators/available-email-validator';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public registrationForm!: FormGroup<IRegistrationForm>;
  public submitted = false;
  public redirectDelaySeconds = 9;
  public submitError = false;
  public submitting = false;
  private _destroyed = new Subject<void>();
  
  constructor(
    private _formBuilder: NonNullableFormBuilder,
    private _availableEmailValidator: AvailableEmailValidator,
    private _registrationService: RegistrationService,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
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

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    this.submitting = true;

    const userData = {
      ...this.registrationForm.getRawValue(),
    };

    delete userData.passwordConfirm;

    this._registrationService.registerUser(userData).pipe(
      finalize(() => {
        this._cdr.markForCheck();
        this.submitting = false;
      }),
      takeUntil(this._destroyed),
    ).subscribe({
      next: () => {
        this.submitted = true;
        this.submitError = false;
      },
      error: () => {
        this.submitError = true;
      },
    });
  }

  public onRedirect(): void {
    this._router.navigate(['/authorization']);
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
