import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { NewCurrencyDto } from 'src/app/demo/domain/Dto/Currencies/NewCurrencyDto';
import { CurrencyService } from 'src/app/demo/service/currencyservice';
import { CurrencyMainComponent } from '../currency-main/currency-main.component';


@Component({
  selector: 'app-currency-create',
  templateUrl: './currency-create.component.html',
  styleUrls: ['./currency-create.component.scss'],
  providers: [MessageService],
})
export class CurrencyCreateComponent implements OnInit {

  currency: NewCurrencyDto;
  currencyDialog: boolean;
  submitted: boolean;
  currencyForm;
  btnloading: boolean = false;
  
  constructor(public main: CurrencyMainComponent,
    private _formBuilder: FormBuilder,
    private messageService: MessageService,
    private service: CurrencyService,) { }

  ngOnInit(): void {
    this.loadForm();
  }
  @Output() eventChange = new EventEmitter<Event>();
  
  openNew() {
    this.submitted = false;
    this.currencyDialog = true;
    this.main.event = null;
    this.resetForm();
  }
  loadForm() {
  this.currencyForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      arabic_name: ["", [Validators.required]],
      exchange_rate: ["", [Validators.required]]
  });
  }
  onSubmitForm(){
    this.btnloading = true;
    if (this.currencyForm.invalid) {
        this.btnloading = false;
        return;
    }

    this.addNewCurrency(this.currencyForm.value);
    }
    addNewCurrency(currency: NewCurrencyDto) {

      this.service.saveCurrency(currency).pipe(first())
        .subscribe({
            next: (response) => {
                this.resetForm();
                this.currencyDialog = false;
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
    this.currencyForm.reset();
    this.btnloading = false;
  }
}
