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

  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.getCards();
  }

  getCards(): void {
    this.cardService.getCards()
      .subscribe(cards => this.cards = cards);
  }

  add(number: string): void {
    number = number.trim();
    if (!number) {
      return;
    }
    this.cardService.addCard({number} as Card)
      .subscribe(card => {
        this.cards.push(card);
      });
  }

  delete(card: Card): void {
    this.cards = this.cards.filter(c => c !== card);
    this.cardService.deleteCard(card).subscribe();
  }

}
