import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private http = inject(HttpClient);
  BaseUrl = environment.apiUrl;

  getMembers() {
    return this.http.get<Member[]>(this.BaseUrl + 'users');
  }

  getMember(username: string) {
    return this.http.get<Member>(this.BaseUrl + 'users/' + username);
  }

  updateMember(member: Member ) {
    return this.http.put<Member>(this.BaseUrl + 'users', member);
  }
}
