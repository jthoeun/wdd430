import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  orginalDocument?: Document;
  document?: Document;
  editMode: boolean = false;

  constructor(
    private docService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }
      this.orginalDocument = this.docService.getDocument(id);
      if (
        this.orginalDocument === undefined ||
        this.orginalDocument === null
      ){
          return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.orginalDocument));
    });
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newDocument = new Document(
      '',
      value.name,
      value.description,
      value.url
    );
    if (this.editMode) {
      this.docService.updateDocument(this.orginalDocument!, newDocument);
    } else {
      this.docService.addDocument(newDocument);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
