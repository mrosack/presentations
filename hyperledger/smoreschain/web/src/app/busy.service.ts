import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/finally';

@Injectable()
export class BusyService implements HttpInterceptor {
    private busyCount = 0;
    private busyStream = new Subject<boolean>();

    public intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.busyStream.next(++this.busyCount > 0);

        return next.handle(req).finally(() => {
            this.busyStream.next(--this.busyCount > 0);
        });
    }

    public subscribeBusy(callback: (value: boolean) => void) {
        return this.busyStream.subscribe(callback);
    }
}
