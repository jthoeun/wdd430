import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFliter',
  standalone: false
})
export class ContactsFliterPipe implements PipeTransform {

  transform(contacts: Contact[], term:string): any {
    let fliteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(term.toLowerCase())
  );
  if (fliteredContacts.length <1 ) return contacts;
  return fliteredContacts;
  }

}
