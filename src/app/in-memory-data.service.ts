import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const cards = [
      { id: 1, number: '+71111111111', operator: 'MTS', balance: 0},
      { id: 2, number: '+72222222222', operator: 'BEELINE', balance: 234},
      { id: 3, number: '+73333333333', operator: 'MEGAFON', balance: 42},
      { id: 4, number: '+74444444444', operator: 'MEGAFON', balance: 113},
      { id: 5, number: '+75555555555', operator: 'BEELINE', balance: 97},
      { id: 6, number: '+76666666666', operator: 'BEELINE', balance: 23}
    ];
    return {cards};
  }
}
