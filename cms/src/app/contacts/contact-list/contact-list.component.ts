import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy{
  
  contacts: Contact[] = [];
  term: string = '';
  subsciption!: Subscription;
    
  constructor (private contactService: ContactService) {}
  
  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subsciption = this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }

  search(searchTerm: string): void {
    this.term = searchTerm;
  }

  onDrop(event: CdkDragDrop<Contact[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.contacts, event.previousIndex, event.currentIndex);
    }
  }
}