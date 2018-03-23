import { Component, Input } from '@angular/core';
import { Camper } from '../swagger/api';

@Component({
  selector: 'sc-camper',
  templateUrl: './camper.component.html',
  styles: ['.card { color: #000; text-shadow: none; }']
})
export class CamperComponent {
    @Input('camper') camper: Camper;
}
