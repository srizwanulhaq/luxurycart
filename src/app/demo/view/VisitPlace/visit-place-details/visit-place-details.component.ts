import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VisitPlaceMainComponent } from '../visit-place-main/visit-place-main.component';
import { VisitPlaceDto } from 'src/app/demo/domain/Dto/VisitPlaces/VisitPlaceDto';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VisitPlaceService } from 'src/app/demo/service/visitPlace.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-visit-place-details',
  templateUrl: './visit-place-details.component.html',
  styleUrls: ['./visit-place-details.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class VisitPlaceDetailsComponent implements OnInit {

  private _details:VisitPlaceDto;

  images: any[] = [];
  zones:any[] = [];
  constructor(public main:VisitPlaceMainComponent,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    private service:VisitPlaceService) { }

  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  
  @Input()
    set details(value: VisitPlaceDto) {
        if (value) {
            this._details = value;
            var lstplacesImages = [];
            value.visitPlaceImagesList
            .forEach(function (value, index) {
              lstplacesImages.push(value.image);
            });
            this.images = lstplacesImages;

            var lstZones = [];
            value.zoneVisitPlacesList
            .forEach(function (value) {
              lstZones.push(value.parkingZone
                );
            });

            this.zones = lstZones;
        }

    }

    get details(): VisitPlaceDto {
        return this._details;
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
            .changeStatus(model)
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

  }
