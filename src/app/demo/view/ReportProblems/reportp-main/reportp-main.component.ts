import { Component, OnInit } from '@angular/core';
import { ReportProblemDao } from 'src/app/demo/domain/Dao/ReportProblems/ReportProblemDao';

@Component({
    selector: 'app-reportp-main',
    templateUrl: './reportp-main.component.html',
    styleUrls: ['./reportp-main.component.scss']
})
export class ReportProblemMainComponent implements OnInit {
    rightPanelActive: boolean;
    reportProblem: ReportProblemDao;
    event: Event;
    last_id: string = ""

    ngOnInit(): void {
    }

    onDetailClick(event, reportProblem) {
        this.reportProblem = reportProblem;
        this.rightPanelActive = !this.rightPanelActive;
        event.preventDefault();
    }

    onLastRp(last_id) {
        this.rightPanelActive = false;
        this.last_id = last_id
    }
}
