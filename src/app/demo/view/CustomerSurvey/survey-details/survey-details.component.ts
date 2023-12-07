import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CustomerSurveyDao } from 'src/app/demo/domain/Dao/CustomerSurvey/CustomerSurveyDao';

@Component({
    selector: 'app-survey-details',
    templateUrl: './survey-details.component.html',
    styleUrls: ['./survey-details.component.scss']
})
export class SurveyDetailsComponent implements OnInit {

    @Input("customerSurvey") customerSurvey: CustomerSurveyDao;
    @Input("customerSurveyModal") customerSurveyModal: boolean;
    @Output() toggleCustomerSurvey = new EventEmitter<null>();

    constructor() { }

    ngOnInit(): void {
    }
    onToggleCustomerSurvey() {
        this.toggleCustomerSurvey.emit(null)
    }
}
