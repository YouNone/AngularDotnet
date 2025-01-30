import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Member } from '../models/member';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  BaseUrl = environment.apiUrl;

  getMembers() {
    return this.http.get<Member[]>(this.BaseUrl + 'users', this.getHttpOptions());
  }

  getMember(username: string) {
    return this.http.get<Member>(this.BaseUrl + 'users/' + username);
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.accountService.currentUser()?.token}`
      })
    }
  }

  constructor() {}
}
