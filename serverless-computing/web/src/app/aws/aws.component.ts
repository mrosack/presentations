import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-aws',
  templateUrl: './aws.component.html',
  styleUrls: ['./aws.component.css']
})
export class AwsComponent implements OnInit {
  private responseJson: any;
  private loading = false;
  private AWS_URL: string = null;
  private LOCAL_URL: string = null;
  @ViewChild('errorModal') private errorModal: ModalDirective;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  loadAws() {
    this.load(this.AWS_URL);
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
