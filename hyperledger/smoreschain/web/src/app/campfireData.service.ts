import { Injectable } from '@angular/core';
import { CamperService, Camper, SystemService, SmoreIngredientService, SmoreIngredient } from './swagger/api';

@Injectable()
export class CampfireDataService {
    private _campers: Camper[];
    private _ingredients: SmoreIngredient[];
    private _activeCamperId: string;

    constructor(
        private camperService: CamperService,
        private ingredientService: SmoreIngredientService,
        private systemService: SystemService
    ) {
    }

    public get campers() {
        return this._campers;
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
            return null;
        }

        return this._ingredients.filter(i => {
            return !i.smore;
        });
    }

    public loadData() {
      this.camperService.camperFind().subscribe(c => {
        this._campers = c;
      });

      this.systemService.systemPing().subscribe(r => {
        this._activeCamperId = r.participant.replace('com.rss.smoreschain.Camper#', '');
      });

      this.ingredientService.smoreIngredientFind().subscribe(i => {
          this._ingredients = i;
      });
    }
}
