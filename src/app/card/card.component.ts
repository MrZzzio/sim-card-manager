import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cards: Card[];

  selectedCard: Card;

  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.getCards();
  }

  onSelect(card: Card): void {
    this.selectedCard = card;
  }

  getCards(): void {
    this.cardService.getCards()
      .subscribe(cards => this.cards = cards);
  }

}
