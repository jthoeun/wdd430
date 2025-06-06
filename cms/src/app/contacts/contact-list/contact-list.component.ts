import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy{
  
  contacts: Contact[] = [];
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

}