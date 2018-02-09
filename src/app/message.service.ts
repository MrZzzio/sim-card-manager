import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  log(message: string) {
    // this.messages.push(message);
    console.log(message);
  }

}
