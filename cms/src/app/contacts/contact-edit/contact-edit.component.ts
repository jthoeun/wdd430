import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact?: Contact;
  contact?: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;
  errorMessage: string = '';

  constructor (
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        this.contact = new Contact('', '', '', '', '', []);
        this.groupContacts = [];
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);
      if (!this.originalContact) return;

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      this.groupContacts = this.contact?.group ?? [];
    });
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newContact = new Contact(
      this.id || '',
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact!, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.onCancel();
  }

  onCancel() {
    this.clearError();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addToGroup(event: CdkDragDrop<Contact[]>) {
    const selectedContact: Contact = event.item.data;
    
    if (this.isInvalidContact(selectedContact)) {
      this.showError(selectedContact);
      return;
    }
    
    this.clearError();
    this.groupContacts.push(selectedContact);
  }

  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) return true;
    if (this.contact && newContact.id === this.contact.id) return true;
    return this.groupContacts.some(c => c.id === newContact.id);
  }

  showError(contact: Contact) {
    if (!contact) {
      this.errorMessage = 'Invalid contact selected.';
    } else if (this.contact && contact.id === this.contact.id) {
      this.errorMessage = 'Cannot add a contact to its own group.';
    } else {
      this.errorMessage = `${contact.name} is already in the group.`;
    }
  }

  clearError() {
    this.errorMessage = '';
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) return;
    this.groupContacts.splice(index, 1);
  }
}