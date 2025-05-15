import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter();

  documents = [
    new Document('1', 'WDD 430 Study Guide', 'Sample study guide', 'https://www.example.com/1'),
    new Document('2', 'Pokemon League Documents', 'Contains links, and resources', 'https://www.example.com/2'),
    new Document('3', 'Card Wishlist', 'list of cards to get.', 'https://www.example.com/3'),
    new Document('4', 'Bussness Plan', 'Sample bussness plan', 'https://www.example.com/4'),
    new Document('5', 'Resume', 'Sample Resume', 'https://www.example.com/5'),
  ];

  constructor() {}

  ngOnInit(): void {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
