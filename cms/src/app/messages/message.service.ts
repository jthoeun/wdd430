import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();
  private messagesUrl = 'http://localhost:3000/messages';
  private messages: Message[] = [];
  private maxMessageId: number = 0;

  constructor(private http: HttpClient) {
  }

  // GET Request
  getMessages(): Message[] {
    this.http
      .get<{message: string, messages: Message[]}>(this.messagesUrl)
      .subscribe({
        next: (response) => {
          this.messages = response.messages || []; 
          this.maxMessageId = this.getMaxId();
          this.messages.sort((a, b) => {
            if (+a.id < +b.id) return -1;
            if (+a.id > +b.id) return 1;
            return 0;
          });
          this.messageChangedEvent.next(this.messages.slice());
        },
        error: (error: any) => {
          console.log(error);
        }
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
          if (+a.id < +b.id) return -1;
          if (+a.id > +b.id) return 1;
          return 0;
        });
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, messageDoc: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          
          this.getMessages();
        }
      );
  }

  getMessage(id: string): Message {
    return this.messages.find((m) => m.id === id)!;
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex(m => m.id === originalMessage.id);
    if (pos < 0) {
      return;
    }

 
    newMessage.id = originalMessage.id;
    (newMessage as any)._id = (originalMessage as any)._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/messages/' + originalMessage.id,
      newMessage, { headers: headers })
      .subscribe(
        () => {
          this.messages[pos] = newMessage;
          this.sortAndSend();
        }
      );
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }

    const pos = this.messages.findIndex(m => m.id === message.id);
    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/messages/' + message.id)
      .subscribe(
        () => {
          this.messages.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((m) => {
      if (+m.id > maxId) maxId = +m.id;
    });
    return maxId;
  }

  private sortAndSend() {
    this.messages.sort((a, b) => {
      if (+a.id < +b.id) return -1;
      if (+a.id > +b.id) return 1;
      return 0;
    });
    this.messageChangedEvent.next(this.messages.slice());
  }
}