import { Component, Input, OnInit } from '@angular/core';
import { PartnerMainComponent } from '../partner-main/partner-main.component';
import { PartnerDto } from 'src/app/demo/domain/Dto/Partners/partner-dto';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class PartnerDetailsComponent implements OnInit {

  private _details:PartnerDto;
  zones:any[] = [];
  constructor(public main:PartnerMainComponent ) { }


  ngOnInit(): void {
  }

  @Input()
  set details(value: PartnerDto) {
      if (value) {
          this._details = value;
          var lstZones = [];
          value.zone_PartnersList
          .forEach(function (value) {
            lstZones.push(value.parking_Zone
              );
          });

          this.zones = lstZones;
      }

  }

  get details(): PartnerDto {
      return this._details;
  }

}
