import { ChangeDetectorRef, Component, trigger, state, style, transition, animate, OnInit } from '@angular/core';
import { BusyService } from './busy.service';

@Component({
  selector: 'sc-busy',
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('.2s'))
    ])
  ],
  template: `
  <div
    [hidden]="busyHidden"
    [@visibilityChanged]="busyValue ? 'shown' : 'hidden'"
    (@visibilityChanged.start)="animationStarted($event)"
    (@visibilityChanged.done)="animationDone($event)" class="sc-busy backdrop">
    <div class="sc-busy spinner"></div>
  </div>`
})
export class BusyComponent implements OnInit {
    public busyHidden = true;
    public busyValue = false;

    constructor(private cdRef: ChangeDetectorRef, private busyService: BusyService) {
    }

    public ngOnInit() {
        this.busyService.subscribeBusy(isBusy => {
            this.busyValue = isBusy;
        });
    }

    public animationStarted(event: any) {
        if (event.toState === 'shown') {
            this.busyHidden = false;
        }

        this.cdRef.detectChanges();
    }

    public animationDone(event: any) {
        if (event.toState === 'hidden') {
            this.busyHidden = true;
        }

        this.cdRef.detectChanges();
    }
}
