import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent implements OnInit {
  @Input() contact!: Contact;

  constructor() { }

  ngOnInit() {
  }
}
