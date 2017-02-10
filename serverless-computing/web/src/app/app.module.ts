import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { AwsComponent } from './aws/aws.component';
import { AzureComponent } from './azure/azure.component';

@NgModule({
  declarations: [
    AppComponent,
    AwsComponent,
    AzureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'aws', pathMatch: 'full' },
      { path: 'aws', component: AwsComponent },
      { path: 'azure', component: AzureComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
