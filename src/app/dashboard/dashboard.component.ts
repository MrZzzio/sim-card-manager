import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  cards: Card[] = [];
  sortBy = ['Sort by balance max to min',
            'Sort by balance min to max',
            'Sort by phone number 0-9',
            'Sort by phone number 9-0',
            'Sort by operator name A-Z',
            'Sort by operator name Z-A'];
  selectedSortBy = this.sortBy[0]; 

  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.getCards(this.selectedSortBy);
  }

  getCards(sort: string): void {
    this.cardService.getMax(sort)
      .subscribe(cards => {
        this.cards = cards.slice(0, 5);
      }
    );
  }

  getTitle(): string {
    return this.cardService.getDashboardTitle();
  }
}
