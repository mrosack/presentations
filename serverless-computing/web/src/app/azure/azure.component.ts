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
  private AZURE_URL: string = null;
  private LOCAL_URL: string = null;
  @ViewChild('errorModal') private errorModal: ModalDirective;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  loadAzure() {
    this.load(this.AZURE_URL);
  }

  loadLocal() {
    this.load(this.LOCAL_URL);
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
