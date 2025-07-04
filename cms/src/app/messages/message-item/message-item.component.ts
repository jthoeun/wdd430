import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  messageSender?: string;

  constructor() {}

  ngOnInit(): void {
    if (typeof this.message.sender === 'object' && this.message.sender !== null) {
      this.messageSender = (this.message.sender as any).name;
    } else {
      this.messageSender = this.message.sender as string;
    }
  }
}