import { SubscriptionLike } from 'rxjs';


export class SubSink {

    protected _subs: SubscriptionLike[] = [];

    constructor() { }

    set sink(subscription: SubscriptionLike) {
        this._subs.push(subscription);
    }

    unsubscribe() {
        this._subs.forEach(sub => sub && sub.unsubscribe());
        this._subs = [];
    }
}
