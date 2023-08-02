import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent {
  isLoggingPage: boolean = false;
  @Output() connectEvent = new EventEmitter();

  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      telephone: ['', []],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }


  GoToLogging() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
    this.isLoggingPage = true;
  }

  GoToRegister() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      telephone: ['', []],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
    this.isLoggingPage = false;
  }

  public login() {
    console.log(this.loginForm);
    console.log(this.loginForm.value);
    this.connectEvent.emit();
  }

  public register() {
    console.log(this.registerForm);
    console.log(this.registerForm.value);
    this.connectEvent.emit();
  }
}
