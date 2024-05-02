import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { Parking_ZonesDto } from 'src/app/demo/domain/Dto/Zone/Parking_ZonesDto';
import { ZoneService } from 'src/app/demo/service/zone.service';
import { ZoneMainComponent } from '../zone-main/zone-main.component';
declare var google: any;
@Component({
  selector: 'app-zone-details',
  templateUrl: './zone-details.component.html',
  styleUrls: ['./zone-details.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class ZoneDetailsComponent implements OnInit {


  private _details:Parking_ZonesDto;
  pointList: { lat: number; lng: number }[] = [];
  edgeCount: number = 1;
  weeks: string[] = [
    "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"
  ]

  constructor(public main: ZoneMainComponent,private service: ZoneService,private messageService: MessageService,
    private _confirmationService: ConfirmationService,) { }

  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();

  @Input() 
  set details(value: Parking_ZonesDto) {
    if (value) {
      this._details = value;
      //this._details.ride_Scrutiny_SettingList.sort((a, b) => a.no_Of_Rides > b.no_Of_Rides ? 1 : -1);
    
    }
  }

  get details(): Parking_ZonesDto {
    return this._details;
    
  }
  
  addEdge(event, points, edgeCount: number) {
    let point = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    if (event.vertex !== undefined) {

      if (event.vertex == points.length - 1) {
        points[0] = point;
        points[event.vertex] = point;
      } else {
        points[event.vertex] = point;
      }
      if (edgeCount == 1) {
        points.pop(points.length - 1);
        edgeCount++;
        this.edgeCount = edgeCount;
      }

    } else if (event.edge !== undefined) {
      points.splice(event.edge + 1, 0, point[0]);
    }

    for (let i = 0; i < points.length; i++) {
      if (points[i] == undefined) {
        points[i] = { lat: point.lat, lng: point.lng }
      }
    }
    this.pointList = [];
    const len = points.length;
    for (let i = 0; i < len; i++) {
      this.pointList.push({ lat: points[i].lat, lng: points[i].lng }
      );
    }
  
  }
  onStatus(e, id) {
    var active = e.checked;
    this._confirmationService.confirm({
      message: "Do you want to change status?",
      header: "Change Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        //-------------------------------------
        var model = {
          id: id,
          active: active,
        };
        this.service
          .changeZoneStatus(model)
          .pipe(first())
          .subscribe({
            next: (response) => {
              this.eventChange.emit(response.result);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
              this.main.bottomPanelActive = false;
            },
            error: (error) => {
                this.main.bottomPanelActive = true;
                this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
            },
          });
   
      },
      reject: () => {
        this.details.active = !active;
      },
    });
  }
  
  setWeekDays(week: string) {
    return week.split(/([0-9])/).filter(w => w != "").map((w: string, i: number) => {
      if (parseInt(w) == 1) {
        return this.weeks[i];
      } return ""
    }).filter(w => w).join(", ")
  }

  onScrutinyStatus(e, id) {
 
    var active = e.checked;

    var model = {
        id: id,
        active: active,
      };
      this.service
        .changeScrutinyStatus(model)
        .pipe(first())
        .subscribe({
          next: (response) => {
            this.eventChange.emit(response.result);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
       
          },
          error: (error) => {
   
              this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
          },
        });       
  }
}
