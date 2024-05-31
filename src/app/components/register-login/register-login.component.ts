import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import * as firebase from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit{
  isLoggingPage: boolean = true;
  @Output() connectEvent = new EventEmitter();

  public loginForm: FormGroup;
  public registerForm: FormGroup;
  failToConnect: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
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

  ngOnInit(): void {
    this.authService.onUserLoggedIn().subscribe(connected => {
      this.failToConnect = !connected;
      console.log(`failToConnect: ${this.failToConnect}`);
      
    })
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
      email: ['', [Validators.email, Validators.required]],
      password: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', [ Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
    this.isLoggingPage = false;
  }

  public login() {
    const value = this.loginForm.value;
    this.authService.login(value.email, value.password)
  }

  public register() {
    const value = this.registerForm.value;
    this.authService.register(value.email, value.password, value.username);
  }
}
