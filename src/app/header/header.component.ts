import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authStatusSubscription = new Subscription();
  isAuthenticated = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authStatusSubscription = this.authService.getAuthStatusListener()
      .subscribe(isAuth => {
        this.isAuthenticated = isAuth;
      });
  }

  onLogout = (): void => {
    this.authService.logout();
  };

  ngOnDestroy() {
    if (this.authStatusSubscription) {
      this.authStatusSubscription.unsubscribe();
    }
  }
}
