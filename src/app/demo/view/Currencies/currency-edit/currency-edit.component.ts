import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { EditCurrencyDto } from 'src/app/demo/domain/Dto/Currencies/EditCurrencyDto';
import { CurrencyService } from 'src/app/demo/service/currencyservice';
import { CurrencyMainComponent } from '../currency-main/currency-main.component';

@Component({
  selector: 'app-currency-edit',
  templateUrl: './currency-edit.component.html',
  styleUrls: ['./currency-edit.component.scss'],
  providers: [MessageService],
})
export class CurrencyEditComponent implements OnInit {

  @Input() editCurrencyData: EditCurrencyDto;
  submitted: boolean;
  currencyEditForm;
  btnloading: boolean = false;

  constructor(public main: CurrencyMainComponent,
    private _formBuilder: FormBuilder,
    private messageService: MessageService,
    private service: CurrencyService) { }

  ngOnInit(): void {
    this.loadForm();
  }
  @Output() eventChange = new EventEmitter<Event>();
  loadForm() {
    this.currencyEditForm = this._formBuilder.group({
        id:["",[Validators.required]],
        name: ["", [Validators.required]],
        arabic_name: ["", [Validators.required]],
        exchange_rate: ["", [Validators.required]]
    });
    }
    ngOnChanges(change: SimpleChange) {
      if (!!change['editCurrencyData'].currentValue) {
          const temp = change['editCurrencyData'].currentValue;
          const group: FormGroup = this.currencyEditForm as FormGroup;
          group.controls['id'].setValue(temp.id || "");
          group.controls['name'].setValue(temp.name || "");
          group.controls['arabic_name'].setValue(temp.arabic_name || "");
          group.controls['exchange_rate'].setValue(temp.exchange_rate || 0);
      }
    }
    onSubmitForm(){
      this.btnloading = true;
      if (this.currencyEditForm.invalid) {
          this.btnloading = false;
          return;
      }
  
      this.editCurrency(this.currencyEditForm.value);
      }
      editCurrency(currency: EditCurrencyDto) {
  
        this.service.updateCurrency(currency).pipe(first())
          .subscribe({
              next: (response) => {
                  this.resetForm();
                  this.main.editPanelActive = false;
                  if (response.status) {
                      this.eventChange.emit(response.status);
                      this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
                  } else {
                      this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
                  }
              },
              error: (error) => {
                  this.btnloading = false;
                  this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
              },
          });
    }
    
    resetForm() {
      this.currencyEditForm.reset();
      this.btnloading = false;
    }

}
