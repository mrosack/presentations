import { Component } from '@angular/core';
import { CampfireDataService } from '../campfireData.service';
import { SmoreIngredient } from '../swagger/api';

@Component({
  selector: 'sc-campfire',
  templateUrl: './campfire.component.html',
  styles: ['.card { color: #000; text-shadow: none; }']
})
export class CampfireComponent {
    public selectedIngredients: string[] = [];

    constructor(public data: CampfireDataService) {
    }

    public availableIngredientsByType(type: string) {
        return this.data.availableIngredients.filter(i => {
            return i.type === type;
        });
    }

    public toggle(ingredient: SmoreIngredient) {
        if (this.selectedIngredients.includes(ingredient.ingredientId)) {
            this.selectedIngredients = this.selectedIngredients.filter(i => {
                return i !== ingredient.ingredientId;
            });
        } else {
            this.selectedIngredients.push(ingredient.ingredientId);
        }
    }
}
