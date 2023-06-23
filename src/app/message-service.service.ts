import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  private message = new BehaviorSubject<string>('');

  constructor() { }

  setMessage(newMessage: string) {
    this.message.next(newMessage);
  }

  getMessage() {
    return this.message.asObservable();
  }
}
