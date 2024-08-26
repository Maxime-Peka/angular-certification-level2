import { Directive, OnDestroy } from '@angular/core';
import { SubSink } from '../sub-sink';

@Directive({
    selector: '[appUnsubscribeOnDestroy]',
})
export class UnsubscribeOnDestroyDirective implements OnDestroy {
    subs = new SubSink();

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}