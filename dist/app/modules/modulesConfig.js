"use strict";
var platform_browser_1 = require("@angular/platform-browser");
var app_1 = require("../components/app-component/app");
var ModuleConfiguration;
(function (ModuleConfiguration) {
    var App = (function () {
        function App() {
        }
        App.imports = [
            platform_browser_1.BrowserModule
        ];
        App.components = [
            app_1.khNg2AgendaComponent
        ];
        App.bootstraps = [
            app_1.khNg2AgendaComponent
        ];
        return App;
    }());
    ModuleConfiguration.App = App;
})(ModuleConfiguration = exports.ModuleConfiguration || (exports.ModuleConfiguration = {}));

//# sourceMappingURL=modulesConfig.js.map
