import { Component, inject, OnInit, ViewChild } from '@angular/core';

import { Member } from '../../models/member';
import { AccountService } from '../../services/account.service';
import { MembersService } from '../../services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent implements OnInit{
    @ViewChild("editForm") editForm?: NgForm;
    private accountService = inject(AccountService);
    private memberService = inject(MembersService);
    private toastr = inject(ToastrService);
    member?: Member


    ngOnInit(): void {
        this.loadMember();
    }

    loadMember() {
        const user = this.accountService.currentUser();
        if (!user) return;
        this.memberService.getMember(user.userName).subscribe({
            next: member => this.member = member
        });
    }


    updateMember() {
        console.log(this.member);
        this.toastr.success("Profile update Successfully");
        this.editForm?.reset(this.member);
    }


}
