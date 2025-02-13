import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { LikesService } from '../services/likes.service';
import { MemberCardComponent } from "../members/member-card/member-card.component";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [FormsModule, ButtonsModule, MemberCardComponent, PaginationModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent implements OnInit, OnDestroy {
    
    likeService = inject(LikesService);
    predicate = 'Liked';
    pageNumber = 1;
    pageSize = 5;
    
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
        this.likeService.getLikes(this.predicate, this.pageNumber, this.pageSize);
    }

    pageChanged(event: any) {
        if (this.pageNumber !== event.page) {
            this.pageNumber = event.page;
            this.loadLikes();
        }
    }

    // If I go to messages and then I go back to the lists, then we can see that signal was emptied
    // in case user get 'liked' when he redirected to see current likes.
    ngOnDestroy() {
        this.likeService.paginatedResult.set(null);
    }

}
