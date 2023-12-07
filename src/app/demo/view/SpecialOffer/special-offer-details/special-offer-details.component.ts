import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { SpecialOfferDao } from 'src/app/demo/domain/Dao/SpecialOffer/SpecialOfferDao';
import { SpecialOfferService } from 'src/app/demo/service/special-offer.service';
import { SpecialOfferMainComponent } from '../special-offer-main/special-offer-main.component';

@Component({
  selector: 'app-special-offer-details',
  templateUrl: './special-offer-details.component.html',
  styleUrls: ['./special-offer-details.component.scss'],
  providers: [MessageService,ConfirmationService],
})
export class SpecialOfferDetailsComponent implements OnInit {


  private _details:SpecialOfferDao;

  constructor(private service: SpecialOfferService,
              public main: SpecialOfferMainComponent,
              private messageService: MessageService,
              private confirmService: ConfirmationService,) { }

  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  @Input() 
  set details(value: SpecialOfferDao) {
    if (value) {
      this._details = value;
    }
  }

  get details(): SpecialOfferDao {
    return this._details;
  }

  deleteOffer(offerId: string) {
    this.main.event = null;
    this.confirmService.confirm({
      message: "Do you want to delete?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.service
          .deleteoffer(offerId)
          .pipe(first())
          .subscribe({
            next: (response) => {
              this.eventChange.emit(response.status);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
              this.main.bottomPanelActive = false;
           
            },
            error: (error) => {
              this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
            },
          });
    
      },
      reject: () => {
      },
    });
  }
}
