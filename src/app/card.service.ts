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

  private cardsUrl = "http://localhost:8081/api/cards";

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl).pipe(
      tap(_ => this.log('fetching cards')),
      catchError(this.handleError('getCards', []))
    );
  }

  getCard(id: number): Observable<Card> {
    return this.http.get<Card>(this.cardsUrl + '/' + id).pipe(
      tap(_ => this.log(`fetching card id=${id}`)),
      catchError(this.handleError<Card>(`getCard with id=${id}`))
    );
  }

  updateCard(card: Card): Observable<any> {
    return this.http.put(this.cardsUrl, card, httpOptions).pipe(
      tap(_ => this.log(`updated card id=${card.id}`)),
      catchError(this.handleError<any>('updateCard'))
    );
  }

  addCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.cardsUrl, card, httpOptions).pipe(
      tap((_: Card) => this.log(`added card id=${card.id}`)),
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
    return this.http.get<Card[]>(this.cardsUrl +
      `/search/?number=${encodeURIComponent(term)}`).pipe(
      tap(_ => this.log(`found cards matching "${term}"`)),
      catchError(this.handleError<Card[]>('searchCards', []))
    );
  }

  getOperator(): string[] {
    return ["MTS", "BEELINE", "MEGAFON", "TELE2"];
  }

  private log(message: string) {
    this.messageService.log('CardService: ' + message);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
 private handleError<T>(operation = 'operation', result ?: T) {
   return (error: any): Observable<T> => {
    console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
