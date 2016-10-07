import {Component, OnInit} from "@angular/core";
import {Agendapunkt} from "../../models/Agendapunkt";

@Component({
    moduleId: module.id,
    selector: "list",
    templateUrl: 'list.html'
})
export class listComponent implements OnInit {
    public agendapunkte: Agendapunkt[];

    public ngOnInit() {
        this.agendapunkte = [
            new Agendapunkt("Erster Agendapunkt", "Irgendeine Beschreibung", ""),
            new Agendapunkt("Zweiter Agendapunkt", "Noch Beschreibung", "")
        ]
    };


}
