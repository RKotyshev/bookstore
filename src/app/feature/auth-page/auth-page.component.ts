import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  public authorizationForm: FormGroup;

  constructor() {
    this.authorizationForm = new FormGroup({
      emailInput: new FormControl('', [Validators.required, Validators.email]),
      passwordInput: new FormControl(''),
    });
  }
}
