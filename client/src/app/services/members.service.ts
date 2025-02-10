import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { of, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { Member } from '../models/member';
import { Photo } from '../models/Photo';
import { PaginatedResult } from '../models/pagination';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
//   members = signal<Member[]>([]);
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);

  getMembers(pageNumber?: number, pageSize?: number) {
    let params = new HttpParams();

    if (pageNumber && pageSize) {
        params = params.append('pageNumber', pageNumber);
        params = params.append('pageSize', pageSize);
    }

    return this.http.get<Member[]>(this.baseUrl + 'users', {observe: 'response', params}).subscribe({
      next: response => {
        this.paginatedResult.set({
            items: response.body as Member[],
            pagination: JSON.parse(response.headers.get("Pagination")!)
        })
      }
    });
  }

  getMember(username: string) {
    // const member = this.members().find((mem) => mem.username === username);
    // if (member !== undefined) return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put<Member>(this.baseUrl + 'users', member).pipe(
    //   tap(() => {
    //     this.members.update((membs) =>
    //       membs.map((m) => (m.username === member.username ? member : m))
    //     );
    //   })
    );
  }

  setMainPhoto(photo: Photo) {
    return this.http
      .put(this.baseUrl + 'users/set-main-photo/' + photo.id, {})
      .pipe(
        // tap(() => {
        //   this.members.update((membs) =>
        //     membs.map((m) => {
        //       if (m.photos.includes(photo)) {
        //         m.photoUrl = photo.url;
        //       }
        //       return m;
        //     })
        //   );
        // })
      );
  }

  deletePhoto(photo: Photo) {
    return this.http
      .delete(this.baseUrl + 'users/delete-photo/' + photo.id)
      .pipe(
        // tap(() => {
        //   this.members.update((membs) =>
        //     membs.map((m) => {
        //       if (m.photos.includes(photo)) {
        //         m.photos = m.photos.filter((ph) => ph.id !== photo.id);
        //       }
        //       return m;
        //     })
        //   );
        // })
      );
  }
}
