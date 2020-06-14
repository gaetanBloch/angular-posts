import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      name: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(5)]]
    });
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

  };
}
