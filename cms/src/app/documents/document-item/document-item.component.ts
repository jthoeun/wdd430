import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-item',
  standalone: false,
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent implements OnInit {
  @Input() document!: Document;

  constructor() {}

  ngOnInit(): void {}
}

