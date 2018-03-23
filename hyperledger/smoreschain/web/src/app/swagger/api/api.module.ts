import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './configuration';

import { CamperService } from './api/camper.service';
import { EatSmoreService } from './api/eatSmore.service';
import { GiveSmoreService } from './api/giveSmore.service';
import { MakeSmoreService } from './api/makeSmore.service';
import { SmoreService } from './api/smore.service';
import { SmoreIngredientService } from './api/smoreIngredient.service';
import { SystemService } from './api/system.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    CamperService,
    EatSmoreService,
    GiveSmoreService,
    MakeSmoreService,
    SmoreService,
    SmoreIngredientService,
    SystemService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        }
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import your base AppModule only.');
        }
    }
}
