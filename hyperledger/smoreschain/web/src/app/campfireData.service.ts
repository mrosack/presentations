import { Injectable } from '@angular/core';
import {
    CamperService, Camper, SystemService, SmoreIngredientService, SmoreIngredient, Smore,
    SmoreService, EatSmoreService, MakeSmoreService, GiveSmoreService
} from './swagger/api';

@Injectable()
export class CampfireDataService {
    private _campers: Camper[];
    private _ingredients: SmoreIngredient[];
    private _smores: Smore[];
    private _activeCamperId: string;

    constructor(
        private camperService: CamperService,
        private ingredientService: SmoreIngredientService,
        private smoreService: SmoreService,
        private makeSmoreService: MakeSmoreService,
        private eatSmoreService: EatSmoreService,
        private giveSmoreService: GiveSmoreService,
        private systemService: SystemService
    ) {
    }

    public get smores() {
        return this._smores || [];
    }

    public get otherCampers() {
        if (!this._campers) {
            return [];
        }

        return this._campers.filter(c => {
            return c.camperId !== this._activeCamperId;
        });
    }

    public get activeCamper() {
        if (!this._campers) {
            return null;
        }

        return this._campers.find(c => {
            return c.camperId === this._activeCamperId;
        });
    }

    public get availableIngredients() {
        if (!this._ingredients) {
            return [];
        }

        return this._ingredients.filter(i => {
            return !i.smore;
        });
    }

    public loadData() {
        const resolveFilter = JSON.stringify({include: 'resolve'});

        this.camperService.camperFind(resolveFilter).subscribe(c => {
            this._campers = c;
        });

        this.systemService.systemPing().subscribe(r => {
            this._activeCamperId = r.participant.replace('com.rss.smoreschain.Camper#', '');
        });

        this.ingredientService.smoreIngredientFind(resolveFilter).subscribe(i => {
            this._ingredients = i;
        });

        this.smoreService.smoreFind().subscribe(s => {
            this._smores = s;
        });
    }

    public createSmore(selectedIngredients: string[]) {
        this.makeSmoreService.makeSmoreCreate({
            smoreId: `SMORE_${this.smores.length + 1}`,
            ingredients: selectedIngredients.map(i => {
                return `com.rss.smoreschain.SmoreIngredient#${i}`;
            })
        }).subscribe(() => {
            this.loadData();
        }, e => {
            this.handleError(e);
        });
    }

    public eatSmore(smoreId: string) {
      this.eatSmoreService.eatSmoreCreate({
        smoreId
      }).subscribe(() => {
          this.loadData();
      }, e => {
          this.handleError(e);
      });
    }

    public giveSmore(smoreId: string, recipientCamperId: string) {
      this.giveSmoreService.giveSmoreCreate({
        smoreId,
        recipientCamperId
      }).subscribe(() => {
          this.loadData();
      }, e => {
          this.handleError(e);
      });
    }

    private handleError(e) {
        if (e.error && e.error.error && e.error.error.message) {
            alert(e.error.error.message);
        } else {
            alert(JSON.stringify(e));
        }
    }
}
