import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  private authStatusSubscription = new Subscription();
  signupForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      name: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(5)]]
    });
    this.authStatusSubscription = this.authService.getAuthStatusListener()
      .subscribe(() => this.isLoading = false);
  }

  get email() {
    return this.signupForm.get('email');
  }

  get name() {
    return this.signupForm.get('name');
  }

  get password() {
    return this.signupForm.get('password');
  }

  onSignup = () => {
    this.isLoading = true;
    this.authService.createUser(
      this.signupForm.value.email,
      this.signupForm.value.name,
      this.signupForm.value.password
    );
  };

  ngOnDestroy() {
    if (this.authStatusSubscription) {
      this.authStatusSubscription.unsubscribe();
    }
  }
}
