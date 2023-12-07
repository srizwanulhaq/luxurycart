import { Component, Input } from '@angular/core';
import { ReportProblemDao } from 'src/app/demo/domain/Dao/ReportProblems/ReportProblemDao';
import { ReportProblemMainComponent } from '../reportp-main/reportp-main.component';

@Component({
  selector: 'app-reportp-details',
  templateUrl: './reportp-details.component.html',
  styleUrls: ['./reportp-details.component.scss']
})
export class ReportProblemDetailComponent {

  private _details: ReportProblemDao;

  constructor(public main: ReportProblemMainComponent) { }

  ngOnInit(): void {
  }

  @Input()
  set details(value: ReportProblemDao) {
    if (value) {
      this._details = value; 
    }
  }

  get details(): ReportProblemDao {
    return this._details;
  }
}
