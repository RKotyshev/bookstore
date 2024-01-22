import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  public authorizationForm: FormGroup;

  constructor() {
    this.authorizationForm = new FormGroup({
      emailInput: new FormControl('', [Validators.required, Validators.email]),
      passwordInput: new FormControl(''),
    });
  }
}
