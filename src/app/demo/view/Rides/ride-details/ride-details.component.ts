import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ridedao } from 'src/app/demo/domain/Dao/Rides/Ridedao';
import { RideService } from 'src/app/demo/service/rideservice';
import { RideMainComponent } from '../ride-main/ride-main.component';
import { ConfirmationService, MessageService } from 'primeng/api'
import { EndRideDto } from 'src/app/demo/domain/Dto/Rides/EndRideDto';
import { first } from 'rxjs/operators';
import { RideDetailsDao } from 'src/app/demo/domain/Dao/Rides/RideDetailsDao';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.scss'],
  providers: [MessageService, ConfirmationService],

})
export class RideDetailsComponent {
  
  private _details:Ridedao;
  position: string;
  endRide: EndRideDto;
  progressSpinner:boolean=false;
  rideDetails:RideDetailsDao;
  originLocation: string = window.location.origin;
  rideImage:string;
  countryCurrency:string;
  hajjPersonName:string;


  constructor(public main: RideMainComponent,
    private service:RideService, 
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }
  
  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  
  @Input() 
  set details(value: Ridedao) {
    if (value) {
      this._details = value;
      this.getRideDetailsById(value.id,value.customer.id);
      this.rideImage = this.originLocation  + value.rideParkingImage.image;
 
    }
  }

  get details(): Ridedao {
    return this._details;
  }
  endRideAction(id, customerId, position: string){
    this.main.event = null;
    this.position = position;
    this.confirmationService.confirm({
        message: 'Do you want to end?',
        header: 'End Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.main.bottomPanelActive = false;
          this.rideEnd(id, customerId);
        },
        reject: () => {

        },
        key: "positionDialog"
    });
  }

  rideEnd(id: any, customerId: any) {
    this.endRide = { customerId: customerId, id: id }
    this.service.rideEnd(this.endRide).pipe(first()).subscribe({
      next: (response) => {
        if(response.result){
   
          this.eventChange.emit(response.result);
          this.messageService.add({severity:'success', summary:'Success', detail:'Ride Ended Successfully', life: 3000});
        }
        else{
          this.messageService.add({severity: 'warning', summary: 'Failed', detail: response.message, life: 3000});
        }
      },
      error: (error) => {
        this.progressSpinner = false;
        this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
      },
    });
  }

  getRideDetailsById(Ride_Id,customer_Id) {
    this.service.getRideDetails(Ride_Id,customer_Id).subscribe(responseList => {
       this.rideDetails = responseList.rideDetails;
       this.countryCurrency = responseList.countryCurrency;
    });
  }
}
