# Angular Simple Timer [![Paypal donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/donate/?business=HZF49NM9D35SJ&no_recurring=0&currency_code=CAD)

A simple timer service for Angular, base on RxJS.

Name/ID(string) base API. RxJS object not exposed.

> To enable faster update, ng2-simple-timer switched to Angular CLI starting 8.2.0 and use new repository https://github.com/J-Siu/ng2-simple-timer-lib/
>
> Project contains both library and example.
>
> All version < 8.2.0 are in old repository https://github.com/J-Siu/ng2-simple-timer/

### Table Of Content
<!-- TOC -->

- [Version](#version)
- [Install](#install)
- [Usage](#usage)
  - ["noImplicitAny": false](#noimplicitany-false)
  - [Import into Angular2 RC5+ application typescript](#import-into-angular2-rc5-application-typescript)
  - [API](#api)
      - [newTimer](#newtimer)
      - [delTimer](#deltimer)
      - [getTimer](#gettimer)
      - [getSubscription](#getsubscription)
      - [subscribe](#subscribe)
      - [unsubscribe](#unsubscribe)
- [Example](#example)
- [Contributors](#contributors)
- [Changelog](#changelog)
- [License](#license)

<!-- /TOC -->

### Version

- For Angular 2.x.x, please use 1.3.1.
- For Angular 4.x.x, please use 1.3.5.
- For Angular 6.x.x, please use 6.0.0.

### Install

```
npm install ng2-simple-timer
```

### Usage

#### "noImplicitAny": false

Must set `"noImplicitAny": false` in application __tsconfig.json__. Else following error may occur at build time:

    error TS7006: Parameter 'any' implicitly has an 'any' type

#### Import into Angular2 RC5+ application (typescript)

`ng2-simple-timer` is implemented as Angular injectable service name __SimpleTimer__.

__For module using SimpleTimer__

Add `SimpleTimer` into module providers (eg. [app.module.ts](https://github.com/J-Siu/ng2-simple-timer-example/blob/master/app/app.module.ts)).

```javascript
import { SimpleTimer } from 'ng2-simple-timer';

@NgModule({
	providers: [SimpleTimer]
})
```

__For each child component using SimpleTimer__

```javascript
import {SimpleTimer} from 'ng2-simple-timer';

export class ChildComponent {

	constructor(private st: SimpleTimer) { }

}
```

#### API

###### newTimer

`newTimer(name: string, sec: number, delay: boolean = false): boolean`

`newTimer` will create timer `name` and tick every 'number' of seconds. Creating timer with the same name multiple times has no side effect.

`delay`: If set to true will delay the 1st tick till the end of the first interval.

Return `false` if timer `name` exist.

```javascript
this.st.newTimer('5sec', 5);
this.st.newTimer('5sec', 5, true);
```

###### delTimer

`delTimer(name: string): boolean`

`delTimer` will delete timer `name`

Return `false` if timer `name` does not exist.

```javascript
this.st.delTimer('5sec');
```

###### getTimer

`getTimer(): string[]`

`getTimer` will return all timer name in string array.
```javascript
let t: string[] = this.st.getTimer();
```

###### getSubscription

`getSubscription(): string[]`

`getSubscription` will return all subscription id in string array.
```javascript
let ids: string[] = this.st.getSubscription();
```

###### subscribe

`subscribe(name: string, callback: () => void): string`

`subscribe` will link `callback` function to timer `name`. Whenever timer `name` tick, `callback` will be invoked.

Return subscription id(string).

Return empty string if timer `name` does not exist.

Either use Lambda(fat arrow) in typescript to pass in callback or bind `this` to another variable in javascript, else `this` scope will be lost.

__Lambda(fat arrow)__
```javascript
counter: number = 0;
timerId: string;

ngOnInit() {
	// lazy mode
	this.timerId = this.st.subscribe('5sec', () => this.callback());
}

callback() {
	this.counter++;
}
```

###### unsubscribe

`unsubscribe(id: string): boolean`

`unsubscribe` will cancel subscription using `id`.

`unsubscribe` will return false if `id` is undefined or `id` is not found in subscription list.

```javascript
timerId: string;

this.st.unsubscribe(this.timerId);
```

### Example

GitHub: [ng2-simple-timer-example](https://github.com/J-Siu/ng2-simple-timer-example)
Plunker: [Angular2 Simple Timer Example](http://embed.plnkr.co/HaTd8q/)

### Contributors

* [John Sing Dao Siu](https://github.com/J-Siu)


### Changelog

* 0.2.0
	- Angular 2 RC4
* 0.2.2
	- API change
		- newTimer() return boolean
		- subscribe() - lazy mode removed
	- API new
		- delTimer()
* 0.2.3
	- Support Angular 2 RC5
* 0.2.4
	- Remove module, export `SimpleTimer` only
* 1.2.4
	- Support Angular 2.0.0
	- Clean up package
* 1.2.5
	- Add Plunker example
* 1.2.7
	- Support Angular 2.4.*
	- Replace node-uuid with uuid
* 1.2.8
	- Change uuid as dependency
* 1.2.9
	- Replace uuid with angular2-uuid
* 1.3.0
	- Add instruction for `"noImplicitAny": false`
	- Clean up package
* 1.3.1
	- Due to the rapid release cycle of Angular, to minimize update purely due to `peerDependencies`, it is modified as follow:
		-	`"peerDependencies": { "@angular/core": ">=2.4.0" }`
* 1.3.2
	- Update package.json for Angular 4.3.1. For Angular 2.x.x, please use 1.3.1 or earlier.
	- Fix readme example code syntax error.
	- API change:
		- `subscribe(name: string, callback: (any) => void): string` change to `subscribe(name: string, callback: () => void): string`
* 1.3.3
	- Fix readme example code for `subscribe`
* 1.3.4
	- Add `delay` option for `newTimer`
* 1.3.5
	- Bugfix for `newTimer`
* 6.0.0
	- Update for Angular 6.x, which include moving from RxJS 5.1 to 6.0
	- Update version to match major version of Angular

### License

The MIT License

Copyright (c) 2018

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
