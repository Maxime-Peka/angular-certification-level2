import { Injectable, OnDestroy } from '@angular/core';
import { SubSink } from './sub-sink';

@Injectable({
    providedIn: 'root',
})
export class UnsubscribeOnDestroyAdapter implements OnDestroy {
    subs = new SubSink();

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}