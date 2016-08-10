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
	newTimer(name: string, sec: number): boolean {
		if (name === undefined || this.timer[name]) {
			return false;
		}
		let o = Observable.timer(0, sec * 1000);
		this.timer[name] = { 's': sec, 'o': o };
		return true;
	}
	delTimer(name: string): boolean {
		if (name === undefined) {
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
		delete this.timer[name].o;
		delete this.timer[name].s;
		delete this.timer[name];
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
