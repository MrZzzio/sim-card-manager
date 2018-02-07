import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { CARDS } from '../mock-card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cards = CARDS;

  selectedCard: Card;

  constructor() { }

  ngOnInit() {
  }

  onSelect(card: Card): void {
    this.selectedCard = card;
  }

}
