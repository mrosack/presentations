import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiModule, Configuration } from './swagger/api';
import { AppComponent } from './app.component';
import { CampfireDataService } from './campfireData.service';
import { CamperComponent } from './camper/camper.component';
import { CampfireComponent } from './campfire/campfire.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BusyService } from './busy.service';
import { BusyComponent } from './busy.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    BusyComponent,
    CamperComponent,
    CampfireComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ApiModule.forRoot(() => {
      return new Configuration({
        basePath: 'http://localhost:3000/api'
      });
    }),
    ModalModule.forRoot()
  ],
  providers: [
    CampfireDataService,
    BusyService,
    { provide: HTTP_INTERCEPTORS, useExisting: BusyService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
