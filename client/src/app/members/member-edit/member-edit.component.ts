import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { Member } from '../../models/member';
import { AccountService } from '../../services/account.service';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent implements OnInit{
    @ViewChild("editForm") editForm?: NgForm;
    @HostListener('window:beforeunload', ['$event']) notify($event: any) {
        if (this.editForm?.dirty) {
            $event.returnValue = true;
        }
    };
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
