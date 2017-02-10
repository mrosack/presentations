import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-aws',
  templateUrl: './aws.component.html',
  styleUrls: ['./aws.component.css']
})
export class AwsComponent implements OnInit {
  private responseJson: any;
  private loading = false;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  loadAws() {
    this.load('https://7bsesjw2af.execute-api.us-east-1.amazonaws.com/dev/hello');
  }

  loadLocal() {
    this.load('http://localhost:3000/hello');
  }

  load(url: string) {
    delete this.responseJson;
    this.loading = true;

    this.http.get(url).forEach(resp => {
      this.loading = false;
      this.responseJson = resp.json();
    });
  }
}
