import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from '../../win-ref.service';

@Component({
  selector: 'cms-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit {
  nativeWindow: any;
  document!: Document;

  constructor(
    private docService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private winRef: WinRefService
  ) {}

  ngOnInit(): void {
    this.nativeWindow = this.winRef.getNativeWindow();

    this.route.params.subscribe((params: Params) => {
      this.document = this.docService.getDocument(params['id'])!;
    });
  }

  onView() {
    if (this.document.url) this.nativeWindow.open(this.document.url);
  }

  onDelete() {
    this.docService.deleteDocument(this.document);
    this.router.navigate(['../'], {relativeTo: this.route});
  }


}
