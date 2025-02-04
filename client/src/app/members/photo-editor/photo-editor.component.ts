import { Component, inject, input, OnInit, output } from '@angular/core';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';

import { Member } from '../../models/member';
import { AccountService } from '../../services/account.service';
import { environment } from '../../../environments/environment';
import { Photo } from '../../models/Photo';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, NgClass, FileUploadModule, DecimalPipe],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.scss'
})
export class PhotoEditorComponent implements OnInit{
    private accountService = inject(AccountService);
    private memberService = inject(MembersService);

    member = input.required<Member>();
    uploader?: FileUploader;
    hasBaseDropZoneOver = false;
    baseUrl = environment.apiUrl;
    memberChange = output<Member>()   
   
    ngOnInit(): void {
        this.initializeUploader();
    }

    fileOverBase(e: any) {
        this.hasBaseDropZoneOver = e;
    }

    setMainPhoto(photo: Photo) {
        this.memberService.setMainPhoto(photo).subscribe({
            next: x => {
                const user = this.accountService.currentUser();
                if (user) {
                    user.photoUrl = photo.url;
                    this.accountService.setCurrentUser(user);
                }
                const updateMember = {...this.member()};
                updateMember.photoUrl = photo.url;
                updateMember.photos.forEach(p => {
                    if (p.isMain) p.isMain = false;
                    if (p.id === photo.id) p.isMain = true;
                });
                this.memberChange.emit(updateMember);
            }
        });
    }

    initializeUploader() {
        this.uploader = new FileUploader({
            url: this.baseUrl + 'users/add-photo',
            authToken: 'Bearer ' + this.accountService.currentUser()?.token,
            isHTML5: true,
            allowedFileType: ["image"],
            removeAfterUpload: true,
            autoUpload: false,
            // 10 mb
            maxFileSize: 10 * 1024 * 1024,
        });
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        }
        this.uploader.onSuccessItem = (item, response, status, headers) => {
            const photo = JSON.parse(response);
            const updatedMember = {...this.member()};
            updatedMember.photos.push(photo);
            this.memberChange.emit(updatedMember);
        }
    }
}
