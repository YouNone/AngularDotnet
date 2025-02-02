import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { environment } from '../../environments/environment';
import { Member } from '../models/member';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private http = inject(HttpClient);
  BaseUrl = environment.apiUrl;
  members = signal<Member[]>([]);

  getMembers() {
    return this.http.get<Member[]>(this.BaseUrl + 'users').subscribe({
        next: members => this.members.set(members)
    });
  }

  getMember(username: string) {
    const member = this.members().find(mem => mem.username === username);
    if (member !== undefined) return of(member);
    
    return this.http.get<Member>(this.BaseUrl + 'users/' + username);
  }

  updateMember(member: Member ) {
    return this.http.put<Member>(this.BaseUrl + 'users', member).pipe(
      tap(() => {
        this.members
            .update(membs => membs
                .map(m => m.username === member.username ? member : m));
      })  
    );
  }
}
