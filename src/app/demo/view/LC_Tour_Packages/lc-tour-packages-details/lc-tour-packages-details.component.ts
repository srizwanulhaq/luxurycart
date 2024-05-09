import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LCTourPackage } from 'src/app/demo/domain/Dao/LCTourPackage/lc-tour-package.model';
import { LCTourPackagesMainComponent } from '../lc-tour-packages-main/lc-tour-packages-main.component';
import { LCTourPackageService } from 'src/app/demo/service/lc-tour-package.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-lc-tour-packages-details',
  templateUrl: './lc-tour-packages-details.component.html',
  styleUrls: ['./lc-tour-packages-details.component.scss']
})
export class LCTourPackagesDetailsComponent implements OnInit {

  
  private _details: LCTourPackage;
  constructor( public main: LCTourPackagesMainComponent,
               private service: LCTourPackageService,
              private messageService: MessageService,
              private confirmService: ConfirmationService) { }

  ngOnInit(): void {
  }
  @Output() eventChange = new EventEmitter<Event>();
  @Input()
  set event(event: Event) {
      if (event) {
      }
  }
  @Input()
  set details(value: LCTourPackage) {
      if (value) {
          this._details = value;
      }

  }

  get details(): LCTourPackage {
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
