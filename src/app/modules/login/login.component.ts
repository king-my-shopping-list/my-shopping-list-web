import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WarningError } from '../../core/interfaces/warning-error.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('Init');
  }

  getErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['email'].hasError('email')
      ? 'Not a valid email'
      : '';
  }

  onSubmit() {
    console.log(this.loginForm);

    if (this.loginForm.invalid) {
      throw new WarningError('Invalid form');
    }

    try {
      const userData = this.loginForm.value;
      userData.email = userData.email.trim();
    } catch (error) {
      if (error instanceof WarningError) {
        console.warn('Warning: ', error);
      } else {
        console.error('Error: ', error);
      }
    }
  }
}
