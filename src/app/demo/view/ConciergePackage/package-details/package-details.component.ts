
import { ConciergePackages } from 'src/app/demo/domain/Dao/Concierge/concierge-packages';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoothDto } from 'src/app/demo/domain/Dto/Booth/BoothDto';
import { ConfirmationService, MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { PackageMainComponent } from '../package-main/package-main.component';
import { ConciergePackageService } from 'src/app/demo/service/concierge-package.service';
@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class PackageDetailsComponent implements OnInit {
  private _details: ConciergePackages;
  constructor( public main: PackageMainComponent,
               private service: ConciergePackageService,
              private messageService: MessageService,
              private confirmService: ConfirmationService) { }

  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  
  @Input()
  set details(value: ConciergePackages) {
      if (value) {
          this._details = value;
      }

  }

  get details(): ConciergePackages {
      return this._details;
  }

  onStatus(e, id) {
    var active = e.checked;
    this.confirmService.confirm({
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
              this.eventChange.emit(response.status);
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
