import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { UUID } from 'angular2-uuid';

interface TimerList {
	[name: string]: {
		second: number,
		observable: Observable<any>
	};
}

interface SubscriptionList {
	[id: string]: {
		name: string,
		subscription: Subscription
	};
}

@Injectable()
export class SimpleTimer {

	private timer: TimerList = {};
	private subscription: SubscriptionList = {};

	getTimer(): string[] {
		return Object.keys(this.timer);
	}
	getSubscription(): string[] {
		return Object.keys(this.subscription);
	}
	newTimer(name: string, sec: number, delay: boolean = false): boolean {
		if (name === undefined || sec === undefined || this.timer[name]) {
			return false;
		}
		let o
		if (delay) {
			o = Observable.timer(sec * 1000, sec * 1000);
		}
		else {
			o = Observable.timer(0, sec * 1000);
		}
		this.timer[name] = { second: sec, observable: o };
		return true;
	}
	delTimer(name: string): boolean {
		if (name === undefined || !this.timer[name]) {
			return false;
		}
		let s = this.getSubscription();
		// unsubscribe all subscription for queue 'name'
		s.forEach(i => {
			if (this.subscription[i].name === name) {
				this.unsubscribe(i);
			}
		});
		// delete queue 'name' subject and observable
		delete this.timer[name].observable;
		delete this.timer[name];
	}
	/**
	 *
	 * @param name
	 * @param callback
	 */
	subscribe(name: string, callback: () => void): string {
		if (!this.timer[name]) {
			return '';
		}
		let id = name + '-' + UUID.UUID();
		this.subscription[id] = {
			name: name,
			subscription: this.timer[name].observable.subscribe(callback)
		}
		return id;
	}
	/**
	 *
	 * @param id
	 */
	unsubscribe(id: string): boolean {
		if (!id || !this.subscription[id]) {
			return false;
		}
		this.subscription[id].subscription.unsubscribe();
		delete this.subscription[id];
	}
}
