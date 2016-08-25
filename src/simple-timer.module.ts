import { NgModule, ModuleWithProviders } from '@angular/core';

import { SimpleTimer } from './simple-timer';

@NgModule({})
export class SimpleTimerModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SimpleTimerModule,
			providers: [SimpleTimer]
		};
	}
}
