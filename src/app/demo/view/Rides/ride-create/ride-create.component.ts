
import {Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerPhonedao } from 'src/app/demo/domain/Dao/Customer/CustomerPhonedao';
import { NewRidedto } from 'src/app/demo/domain/Dto/Rides/NewRideDto';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { RideService } from 'src/app/demo/service/rideservice';
import { VehicleService } from 'src/app/demo/service/vehicleservice';
import { first } from "rxjs/operators";
import { MessageService } from 'primeng/api';
import { RideMainComponent } from '../ride-main/ride-main.component';

@Component({
  selector: 'app-ride-create',
  templateUrl: './ride-create.component.html',
  styleUrls: ['./ride-create.component.scss']
})
export class RideCreateComponent implements OnInit {

  ride: NewRidedto;
  rideDialog: boolean;
  submitted: boolean;
  filteredPhones: any[];
  filteredVehicles: any[];
  selectedPhone: CustomerPhonedao;
  selectedVehicle: any;
  rideForm;
  btnloading: boolean = false;


  @Output() eventChange = new EventEmitter<Event>();

  

  constructor(private service: CustomerService, 
              private vhclService: VehicleService,
              private _formBuilder: FormBuilder,
              private rideServie: RideService,
              private messageService: MessageService,
              public main: RideMainComponent) { }

  ngOnInit(): void {
    this.rideForm = this._formBuilder.group({
      selectedPhone: ["", [Validators.required]],
      selectedVehicle: ["", [Validators.required]],
    });
  }

  openNew() {
    this.main.event = null;
    this.ride = {};
    this.submitted = false;
    this.rideDialog = true;
    this.resetForm();
  }
  
  hideDialog(){
    this.rideDialog = false;
  }

  searchPhones(event){
      this.service.getPhones(event.query).then(res => {
       
        let filtered: any[] = [];
  
        for (let i = 0; i < res.length; i++) {
          let phone =  res[i];
          filtered.push(phone);
        }
  
        this.filteredPhones = filtered;
        
      });
  }

  searchVehicles(event){
    
    this.vhclService.searchScooters(event.query).then(res => {
      let vehiclefiltered: any[] = [];

      res.forEach((element) => {
        vehiclefiltered.push({ name: element.number, code: element.id });
      });

      this.filteredVehicles = vehiclefiltered;
    });
  }

  onSubmitForm() {
    this.btnloading = true;
    if (this.rideForm.invalid) {
      this.btnloading = false;
      return;
    }

    this.ride = {  phoneNumber : this.selectedPhone.name, vehicle : { number:this.selectedVehicle.name }  }
    this.startNewRide(this.ride);
  }

  startNewRide(ridedto: NewRidedto) {
      this.submitted = true;
      this.rideServie.rideStart(ridedto).pipe(first())
      .subscribe({
        next: (response) => {
          this.resetForm();
          this.rideDialog = false;
          if (response.result) {
            this.eventChange.emit(response.result);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Ride stated successfully', life: 3000});
          }else {
            this.messageService.add({severity: 'warning', summary: 'Failed', detail: response.message, life: 3000});
          }
        },
        error: (error) => {
          this.rideDialog = false;
          this.resetForm();
          this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
        },
    });
  }

  resetForm() {
    this.rideForm.reset();
    this.btnloading = false;
  }
}
