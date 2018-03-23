import { Component, Input } from '@angular/core';
import { CampfireDataService } from '../campfireData.service';

@Component({
  selector: 'sc-campfire',
  templateUrl: './campfire.component.html',
  styles: ['.card { color: #000; text-shadow: none; }']
})
export class CampfireComponent {
    constructor(private data: CampfireDataService) {
    }

    public availableIngredientsByType(type: string) {
        return this.data.availableIngredients.filter(i => {
            return i.type === type;
        });
    }
}
