import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';

import { Card } from './card';
import { CardService } from './card.service';

describe('CardService', () => {

  let httpClient: HttpClient;
  let httpController: HttpTestingController;
  let messageService: MessageService;
  let cardsService: CardService;
  const respData: Card[] = [
    {id: 1, number: '+71111111111', operator: 'MTS', balance: 150},
    {id: 2, number: '+722222222228', operator: 'MTS', balance: 150}
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardService, MessageService]
    });  
    httpClient = TestBed.get(HttpClient);
    httpController = TestBed.get(HttpTestingController);
    messageService = TestBed.get(MessageService);
    cardsService = new CardService(messageService, httpClient);
  });

  it('should be created', () => {
    expect(cardsService).toBeTruthy();
  });

  it('should have made one request to GET data from expected URL', () => {
    let pageNumber = 1;
    cardsService.getCards(pageNumber).subscribe(data => {
      expect(data).toEqual(respData);
    });
    const req = httpController.expectOne(cardsService.cardsUrl + '?page=' + pageNumber);
    expect(req.request.method).toEqual('GET');
    req.flush(respData);
    httpController.verify();
  });

  it('should get operators', () => {
    expect(cardsService.getOperator()).toEqual(['MTS', 'BEELINE', 'MEGAFON', 'TELE2']);
  });

});
