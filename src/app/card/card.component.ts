import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cards: Card[];

  constructor(private cardService: CardService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let page = +this.route.snapshot.queryParams['page'];
    this.getCards(page - 1);
  }

  getCards(page: number): void {
    this.cardService.getCards(page)
      .subscribe(cards => this.cards = cards.content);
  }

  delete(card: Card): void {
    this.cards = this.cards.filter(c => c !== card);
    this.cardService.deleteCard(card).subscribe();
  }

}
