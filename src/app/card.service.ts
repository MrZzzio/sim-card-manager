import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Card } from './card';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CardService {

  private cardsUrl = 'api/cards'; //URL to web api

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl).pipe(
      tap(cards => this.log('fetching cards')),
      catchError(this.handleError('getCards', []))
    );
  }

  getCard(id: number): Observable<Card> {
    this.messageService.add(`CardService: fetched card id=${id}`);
    return this.http.get<Card[]>(this.cardsUrl + '/' + id);
  }

  updateCard(card: Card): Observable<any> {

    return this.http.put(this.cardsUrl, card, httpOptions).pipe(
      tap(_ => this.log(`updated card id=${card.id}`)),
      catchError(this.handleError<any>('updateCard'))
    );
  }

  addCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.cardsUrl, card, httpOptions).pipe(
      tap((card: Card) => this.log(`added card w/ id=${card.id}`)),
      catchError(this.handleError<Card>('addCard'))
    );
  }

  deleteCard(card: Card | number): Observable<Card> {
    const id = typeof card === 'number' ? card : card.id;
    const url = `${this.cardsUrl}/${id}`;
    return this.http.delete<Card>(url, httpOptions).pipe(
      tap(_ => this.log(`delete card id=${id}`)),
      catchError(this.handleError<Card>('deleteCard'))
    );
  }

  searchCards(term: string): Observable<Card[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Card[]>(`api/cards/?number=${term}`).pipe(
      tap(_ => this.log(`found cards matching "${term}"`)),
      catchError(this.handleError<Card[]>('searchCards', []))
    );
  }

  private log(message: string) {
    this.messageService.add('CardService: ' + message);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
