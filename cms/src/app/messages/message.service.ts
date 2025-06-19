import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  private messagesUrl = 'https://wdd430-cms-2309e-default-rtdb.firebaseio.com/messages.json';
  private messages: Message[] = [];
  private maxMessageId: number = 0;

  constructor(private http: HttpClient) {}

  // GET Request
  getMessages(): Message[] {
    this.http.get<Message[]>(this.messagesUrl).subscribe((msgs: Message[]) => {
      this.messages = msgs;
      this.maxMessageId = this.getMaxId();
      this.messages.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      this.messageChangedEvent.next(this.messages.slice());
    });
    return this.messages.slice();
  }

  // PUT Request
  storeMessages() {
    this.http
      .put(this.messagesUrl, JSON.stringify(this.messages), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.messages.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  addMessage(newMessage: Message) {
    if (newMessage === null || newMessage === undefined) return;
    this.maxMessageId++;
    newMessage.id = `${this.maxMessageId}`;
    this.messages.push(newMessage);
    this.storeMessages();
  }

  getMessage(id: string): Message {
    return this.messages.find((m) => m.id === id)!;
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((m) => {
      if (+m.id > maxId) maxId = +m.id;
    });
    return maxId;
  }
}