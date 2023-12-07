import { Component, OnInit } from '@angular/core';
import { CustomerSurveyDao } from 'src/app/demo/domain/Dao/CustomerSurvey/CustomerSurveyDao';

@Component({
    selector: 'app-survey-main',
    templateUrl: './survey-main.component.html',
    styleUrls: ['./survey-main.component.scss']
})
export class SurveyMainComponent implements OnInit {

    event: Event;
    customerSurvey?: CustomerSurveyDao = null
    customerSurveyModal: boolean = false
    constructor() { }

    ngOnInit(): void {
    }
    onChange(event) {
        this.event = event;
    }

    toggleCustomerSurvey(survey: CustomerSurveyDao = null) {
        this.customerSurvey = survey
        this.customerSurveyModal = !!survey
    }
}
