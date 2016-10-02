import {BrowserModule} from "@angular/platform-browser";
import {khNg2AgendaComponent} from "../components/app-component/app";

export namespace ModuleConfiguration {
    export class App {

        public static imports = [
            BrowserModule
        ];

        public static components = [
            khNg2AgendaComponent            
        ];

        public static bootstraps = [
            khNg2AgendaComponent
        ];
    }
} 
