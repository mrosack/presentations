import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Camper, Smore } from '../swagger/api';
import { CampfireDataService } from '../campfireData.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'sc-camper',
  templateUrl: './camper.component.html',
  styles: ['.card, ::ng-deep .modal { color: #000; text-shadow: none; }']
})
export class CamperComponent {
    @Input('camper') camper: Camper;
    @Input('isYou') isYou = false;
    @ViewChild('giveSmoreTemplate') giveSmoreTemplate: TemplateRef<any>;
    modalRef: BsModalRef;
    smoreToGive: Smore;
    camperIdToGiveTo: string;

    constructor(private modalService: BsModalService, public cdService: CampfireDataService) {
    }

    giveSmore(smore: Smore) {
      this.camperIdToGiveTo = this.cdService.otherCampers[0].camperId;
      this.smoreToGive = smore;
      this.modalRef = this.modalService.show(this.giveSmoreTemplate);
    }
}
