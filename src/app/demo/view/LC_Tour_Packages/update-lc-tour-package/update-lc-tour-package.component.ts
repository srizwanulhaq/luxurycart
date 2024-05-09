import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LCTourPackage, TicketDropDown } from 'src/app/demo/domain/Dao/LCTourPackage/lc-tour-package.model';
import { LCTourPackageService } from 'src/app/demo/service/lc-tour-package.service';
import { LCTourPackagesMainComponent } from '../lc-tour-packages-main/lc-tour-packages-main.component';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-update-lc-tour-package',
  templateUrl: './update-lc-tour-package.component.html',
  styleUrls: ['./update-lc-tour-package.component.scss']
})
export class UpdateLCTourPackageComponent implements OnInit {

  packageForm: any;
  ticketType: TicketDropDown[];
  submitted: boolean;
  packageDialog: boolean;
  package: LCTourPackage;
  btnloading: boolean;
  price:number;
  @Output() eventChange = new EventEmitter<Event>();
  tickettypeDD: TicketDropDown[];
  quantity: any;
 
  constructor(private _formBuilder: FormBuilder,
    private _service: LCTourPackageService,
    public main: LCTourPackagesMainComponent,
    private messageService: MessageService,
    private cdref: ChangeDetectorRef) { 
      
    this.loadForm();
      this.packageForm.get('no_Of_Tickets').valueChanges.subscribe(() => {
        this.updateDiscountedPercentValidation();
      });
      this.packageForm.get('ticket_Type_Id').valueChanges.subscribe(() => {
        this.updateDiscountedPercentValidation();
      });

    }

    ngOnInit(): void {
    this.loadDropdownValues();
    this.resetForm();
    }

    loadForm() {
      this.packageForm = this._formBuilder.group({
        id:["",[Validators.required]],
        title: ["", [Validators.required]],
        ticket_Type_Id: ["", [Validators.required]],
        no_Of_Tickets:[0,[Validators.required]],
        amount: [{value: 0.0, disabled: true}],
        discounted_Percent: [0.0, [Validators.required,Validators.max(100),Validators.min(1)]],
        net_Amount: [{value: 0, disabled: true}]
      });
      

    }
    updateDiscountedPercentValidation() {
      const noOfTickets = this.packageForm.get('no_Of_Tickets').value;
      const ticketTypeId = this.packageForm.get('ticket_Type_Id').value;
  
      // Enable 'discounted_Percent' field only if both 'no_Of_Tickets' and 'ticket_Type_Id' are filled
      if (noOfTickets && ticketTypeId) {
        this.packageForm.get('discounted_Percent').enable();
      } else {
        this.packageForm.get('discounted_Percent').disable();
      }
    }
    loadDropdownValues() {
      this._service.getTicketTypeDropdowns().then(resp => {
        if (resp) {
            this.tickettypeDD = resp;
        }});
    
    }

    @Input() 
    set packages(value: LCTourPackage) {
      if (value) {
        this.loadDropdownValues();
        this.package = value;
        this.resetForm();
        this.setValues();
       
      }
    }
  
    get packages(): LCTourPackage {
      return this.package;
    }
  
    setValues() {
      if(this.package){
        
        this.packageForm.controls.id.setValue(this.packages.id);
        this.packageForm.controls.title.setValue(this.packages.title);
        this.packageForm.controls.discounted_Percent.setValue(this.packages.discounted_Percent);
        this.packageForm.controls.no_Of_Tickets.setValue(this.packages.no_Of_Tickets);
        this.packageForm.controls.ticket_Type_Id.setValue(this.packages.ticket_Type_Id);
        this.packageForm.controls.amount.setValue(this.packages.amount);
        this.packageForm.controls.net_Amount.setValue(this.packages.net_Amount);
        
        this.price =this.packages.amount;
        this.quantity=this.packages.no_Of_Tickets;

      }
    }
  

    UpdateAmount(event)
    {
      this.quantity = this.packageForm.controls.no_Of_Tickets.value;
      if(event)
      {
        this.price = this.tickettypeDD.find(x=>x.value===event.value).price;
        this.packageForm.controls.amount.setValue(this.price);
      }
      this.Calc();
    }
    Calc()
    {
      this.quantity = this.packageForm.controls.no_Of_Tickets.value;
      const discountPercent = this.packageForm.get('discounted_Percent').value;

      if(this.quantity && this.price && discountPercent)
        {
      // Ensure that this.quantity and this.price are updated before performing calculations
      const net = (this.price * this.quantity) - ((this.price * this.quantity) * (discountPercent *0.01));
      this.packageForm.controls.net_Amount.setValue(Math.round(net));
        }
      //console.log(this.price, this.quantity, discountPercent);
    }

    hideDialog(){
    this.packageDialog = false;
    }

    onSubmitForm() {

    this.btnloading = true;

    if (this.packageForm.invalid) {
    this.btnloading = false;
    return;
    }
    //console.log(this.packageForm.value)
    this.updatePackage(this.packageForm.value);
    }

    updatePackage(ticket_type: LCTourPackage) {
      ticket_type.amount = this.packageForm.get('amount').value;
      ticket_type.net_Amount= this.packageForm.get('net_Amount').value;
      this._service.updatePackage(ticket_type).pipe(first())
      .subscribe({
      next: (response) => {
      this.resetForm();
      this.packageDialog = false;
      this.main.editPanelActive = false;
      this.main.bottomPanelActive=false;
      if (response.status) {
        this.eventChange.emit(response.status);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
      }else {
        this.messageService.add({severity: 'warning', summary: 'Failed', detail: response.message, life: 3000});
      }
    },
    error: (error) => {
      this.btnloading = false;
      console.log(error)
      this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000});
    },
    });
    }

    resetForm() {
    this.packageForm.reset();
    this.btnloading = false;
    }

    ngAfterContentChecked() {
    this.cdref.detectChanges();
    }
}
