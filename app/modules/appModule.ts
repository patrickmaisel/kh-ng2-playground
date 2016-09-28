import { NgModule } from '@angular/core';

import {ModuleConfiguration} from './modulesConfig'

@NgModule({
    imports: ModuleConfiguration.App.imports,
    exports: [],
    declarations: [],
    providers: [],
    bootstrap: []
})
export class AppModule { }
