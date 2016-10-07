import {BrowserModule} from "@angular/platform-browser";
import {khNg2AgendaComponent} from "../components/app/app";
import {listComponent} from "../components/list/list";
import {appRootRoutingModule} from "./routingModule";

export namespace ModuleConfiguration {
    export class App {

        public static imports = [
            BrowserModule,
            appRootRoutingModule,
        ];

        public static components = [
            khNg2AgendaComponent,
            listComponent      
        ];

        public static bootstraps = [
            khNg2AgendaComponent
        ];
    }
}
