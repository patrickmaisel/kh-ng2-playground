import { NgModule } from '@angular/core';

import {ModuleConfiguration} from './modulesConfig'

@NgModule({
    imports: ModuleConfiguration.App.imports, // Import other modules
    exports: [],
    declarations: [ ModuleConfiguration.App.components ], // list components, directives, pipes, ... that are consolidated by this module
    providers: [], // list services that are used
    bootstrap: [ ModuleConfiguration.App.bootstraps ]
})
export class AppModule { }
