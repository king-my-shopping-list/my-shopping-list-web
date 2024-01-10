import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/api/auth/auth.service';
import { WarningError } from '../../../../core/interfaces/warning-error.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  hide = true;

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.loginForm = this.formBuilder.group({
      displayName: ['', [Validators.required, Validators.min(3)]],
      email: ['', [Validators.required, Validators.email]],
      passwordNew: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    });
  }

  getErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['email'].hasError('email')
      ? 'Not a valid email'
      : '';
  }

  async onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      throw new WarningError('Invalid form');
    }

    try {
      const userData = this.loginForm.value;
      userData.email = userData.email.trim();

      await this.authService.signUp(
        userData.email,
        userData.passwordNew,
        userData.displayName,
      );
    } catch (error) {
      if (error instanceof WarningError) {
        console.warn('Warning: ', error);
      } else {
        console.error('Error: ', error);
      }
    }
  }
}
