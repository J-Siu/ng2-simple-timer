import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

interface TimerList {
	[name: string]: {
		s: number,
		o: Observable<any>
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

	uuid = require('node-uuid');

	private timer: TimerList = {};
	private subscription: SubscriptionList = {};

	getTimer(): string[] {
		return Object.keys(this.timer);
	}
	getSubscription(): string[] {
		return Object.keys(this.subscription);
	}
	newTimer(name: string, sec: number): void {
		if (this.timer[name] === undefined) {
			let o = Observable.timer(0, sec * 1000);
			this.timer[name] = {
				's': sec,
				'o': o
			};
		}
	}
	subscribe(name: string, sec: number, callback: (any) => void, lazy = true): string {
		if (lazy) {
			this.newTimer(name, sec);
		} else if (!this.timer[name]) {
			return '';
		}
		let id = name + '-' + this.uuid.v1();
		this.subscription[id] = {
			name: name,
			subscription: this.timer[name]['o'].subscribe(callback)
		}
		return id;
	}
	unsubscribe(id: string): boolean {
		if (!id || !this.subscription[id]) {
			return false;
		}
		this.subscription[id].subscription.unsubscribe();
		delete this.subscription[id];
	}
}
