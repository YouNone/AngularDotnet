import { Component, inject, OnInit } from '@angular/core';
import { LikesService } from '../services/likes.service';
import { Member } from '../models/member';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MemberCardComponent } from "../members/member-card/member-card.component";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [FormsModule, ButtonsModule, MemberCardComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent implements OnInit {
    private likeService = inject(LikesService);
    members: Member[] = [];
    predicate = 'Liked';
    
    ngOnInit(): void {
        this.loadLikes();
    }

    getTitle() {
        switch (this.predicate) {
            case 'liked': return 'Members you like';
            case 'likedBy': return 'Members who like you';
            default: return 'Mutual';
        }
    }

    loadLikes() {
        this.likeService.getLikes(this.predicate).subscribe({
            next: members => this.members = members
        });
    }

}
