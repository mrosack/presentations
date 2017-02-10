import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-azure',
  templateUrl: './azure.component.html',
  styleUrls: ['./azure.component.css']
})
export class AzureComponent implements OnInit {
private responseJson: any;
  private loading = false;
  @ViewChild('errorModal') private errorModal: ModalDirective;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  loadAws() {
    this.load('http://mikefunctiontest.azurewebsites.net/api/HelloWorld');
  }

  loadLocal() {
    this.load('http://localhost:7071/api/HelloWorld');
  }

  load(url: string) {
    delete this.responseJson;
    this.loading = true;

    this.http.get(url).forEach(resp => {
      this.loading = false;
      this.responseJson = resp.json();
    }).catch(err => {
      this.errorModal.show();
      this.loading = false;
    });
  }
}
