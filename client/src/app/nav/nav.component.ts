import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  private accountService = inject(AccountService);
  loggedIn = false;
  model: any = {};

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.loggedIn = true;
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
