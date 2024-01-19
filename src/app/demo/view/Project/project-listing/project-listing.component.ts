import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BoothMainComponent } from '../../Booths/booth-main/booth-main.component';
import { ProjectsService } from 'src/app/demo/service/projects.service';
import { Projectdto } from 'src/app/demo/domain/Dto/Project/projectdto';
import { Table } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';
import { ProjectMainComponent } from '../project-main/project-main.component';
import { Projects } from 'src/app/demo/domain/Dao/Projects/projects';

@Component({
  selector: 'app-project-listing',
  templateUrl: './project-listing.component.html',
  styleUrls: ['./project-listing.component.scss']
})
export class ProjectListingComponent implements OnInit {

  loading: boolean = false;
  event_status: any;
  filterGlobalValue: any;
  totalRecords: number;
  lstproject: Projects[];
  rowsPerPageOptions = [10, 25, 50];
  @ViewChild(Table, { static: false }) tableEvent;
  startDate: string = ""
  endDate: string = ""

  constructor(private service: ProjectsService,
    private cdref: ChangeDetectorRef,
    public main:ProjectMainComponent) { 
      localStorage.removeItem("projectListDao-local");
    }

  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  @Input()
  set event(event: Event) {
    if (event) {
      this.loadProjects(this.tableEvent);
    }
  }

  loadProjects(event: LazyLoadEvent) {
    this.loading = true;
    this.event_status = event;
    setTimeout(() => {
        this.service.getAllProject(
            event.first / event.rows + 1,
            event.rows,
            event.globalFilter ?? this.filterGlobalValue,
            event.sortField,
            event.sortOrder,
            !!this.startDate ? `&startDate=${this.startDate}&endDate=${this.endDate}` : ""
        ).then(res => {
            this.lstproject = res.results;
            this.totalRecords = res.rowCount;
            this.loading = false;
        })
    }, 1000);
}
  resetDataTable(dt) {
    dt.reset();
    localStorage.removeItem("projectListDao-local");
    this.event_status.globalFilter = "";
    this.filterGlobalValue = null;
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
}
onDateChange(data) {
  this[`${data.type}Date`] = data.date
}

onRangeChange(reset) {
  if (reset) {
      this.startDate = ""
      this.endDate = ""
  } this.loadProjects(this.tableEvent)
}

}
