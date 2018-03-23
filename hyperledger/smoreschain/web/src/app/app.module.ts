import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApiModule, Configuration } from './swagger/api';
import { AppComponent } from './app.component';
import { CampfireDataService } from './campfireData.service';
import { CamperComponent } from './camper/camper.component';
import { CampfireComponent } from './campfire/campfire.component';


@NgModule({
  declarations: [
    AppComponent,
    CamperComponent,
    CampfireComponent
  ],
  imports: [
    BrowserModule,
    ApiModule.forRoot(() => {
      return new Configuration({
        basePath: 'http://localhost:3000/api'
      });
    })
  ],
  providers: [CampfireDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
