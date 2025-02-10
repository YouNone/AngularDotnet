import { Component, inject, OnInit } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { MembersService } from '../../services/members.service';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent, PaginationModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit {
    pageNumber = 1;
    pageSize = 5;
  
  membersService = inject(MembersService);

  ngOnInit(): void {
    if (!this.membersService.paginatedResult()) {
        this.loadMembers();
    }
  }

  loadMembers() {
    this.membersService.getMembers(this.pageNumber, this.pageSize);
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
        this.pageNumber = event.page;
        this.loadMembers();
    }
  }

}
