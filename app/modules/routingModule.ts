import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {listComponent} from "../components/list/list";

const appRootRoutes: Routes = [
    { 
        path: '',
        component: listComponent
    }
];

export const appRootRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRootRoutes);




