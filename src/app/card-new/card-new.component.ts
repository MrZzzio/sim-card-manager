import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Card } from '../card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-new',
  templateUrl: './card-new.component.html',
  styleUrls: ['./card-new.component.css']
})
export class CardNewComponent implements OnInit {

  constructor(private cardService: CardService,
              private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  add(number: string, operator: string, balance: number): void {
    number = number.trim();
    if (!number) {
      return;
    }
    this.cardService.addCard({number, operator, balance} as Card)
      .subscribe(() => this.goBack());
  }

  getOperator(): string[] {
    return this.cardService.getOperator();
  }

}
