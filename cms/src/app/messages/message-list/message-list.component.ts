import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent  implements OnInit{
  messages: Message[] = [
    new Message('1', 'Test 1', 'Hello, this is a test', 'Professor Proton'),
    new Message('2', 'Test 2', 'Hello, this is another test', 'Professor X'),
    new Message('3', 'Test 3', 'Hello, this is another test yet again', 'Professor Elm'),
    new Message('4', 'Test 4', 'Pikachu!', 'Professor Oak')
  ];
  
  constructor() {}

  ngOnInit(): void {}

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
