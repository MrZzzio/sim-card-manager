import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  private cards: Card[];

  private pages: number[];

  constructor(private cardService: CardService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let page = +this.route.snapshot.queryParams['page'];
    this.getCards(page - 1);
  }

  getCards(page: number): void {
    this.cardService.getCards(page)
      .subscribe(cards => {
        this.cards = cards.content;
        this.getPages(cards);
      });
  }

  delete(card: Card): void {
    this.cards = this.cards.filter(c => c !== card);
    this.cardService.deleteCard(card).subscribe();
  }

  private getPages(cards: any): void {
    let totalPages = cards.totalPages;
    let currentPage = cards.number + 1;
    let pageSize = cards.numberOfElements;
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 5 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    this.pages = _.range(startPage, endPage + 1);
  }
}
