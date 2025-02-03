import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { Member } from '../../models/member';
import { AccountService } from '../../services/account.service';
import { MembersService } from '../../services/members.service';
import { PhotoEditorComponent } from "../photo-editor/photo-editor.component";

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule, PhotoEditorComponent],
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
        this.memberService.updateMember(this.editForm?.value).subscribe({
            next: upd => {
                this.toastr.success("Profile update Successfully");
                this.editForm?.reset(this.member);
            }
        });
    }

    onMemberChange(event: Member) {
        this.member = event;
    }

}
