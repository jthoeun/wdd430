import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject!: ElementRef;
  @ViewChild('msgText') msgText!: ElementRef;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  onSendMessage() {
    const subject = this.subject.nativeElement.value;
    const msgtext = this.msgText.nativeElement.value;
    const message = new Message('1', subject, msgtext, '4');
    this.messageService.addMessage(message);
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

}
