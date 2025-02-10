import { Component, inject, OnInit } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';

import { MembersService } from '../../services/members.service';
import { MemberCardComponent } from "../member-card/member-card.component";
import { AccountService } from '../../services/account.service';
import { UserParams } from '../../models/userParams';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent, PaginationModule, FormsModule, ButtonsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit {
    private accountService = inject(AccountService);
    membersService = inject(MembersService);
    userParams = new UserParams(this.accountService.currentUser());
    genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}]

  ngOnInit(): void {
    if (!this.membersService.paginatedResult()) {
        this.loadMembers();
    }
  }

  loadMembers() {
    this.membersService.getMembers(this.userParams);
  }

  resetFilters() {
    this.userParams = new UserParams(this.accountService.currentUser());
    this.loadMembers();
  }

  pageChanged(event: any) {
    if (this.userParams.pageNumber !== event.page) {
        this.userParams.pageNumber = event.page;
        this.loadMembers();
    }
  }

}
