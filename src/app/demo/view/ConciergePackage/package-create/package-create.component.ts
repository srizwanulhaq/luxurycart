import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { PackageMainComponent } from '../package-main/package-main.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConciergePackageService } from 'src/app/demo/service/concierge-package.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-package-create',
  templateUrl: './package-create.component.html',
  styleUrls: ['./package-create.component.scss'],
  providers:[MessageService]
})
export class PackageCreateComponent implements OnInit {

  
  submitted:boolean;
  packageDialog:boolean;
  packageForm:any;
  btnLoading:boolean;
  is_Unlimited:boolean=false;

  constructor(public main: PackageMainComponent,
    private _formBuilder: FormBuilder,
    private service: ConciergePackageService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadForm();
  }
  @Output() eventChange = new EventEmitter<Event>();

  openNew() {
    this.submitted = false;
    this.packageDialog = true;
    this.main.event = null;
    this.resetForm();
}

onSubmitForm(){
  this.btnLoading = true;
  this.submitted = true;
  if (this.packageForm.invalid) {
      this.btnLoading = false;
      return;
  }
this.addNewPackage(this.packageForm.value);

}
addNewPackage(packages) 
{
  this.service.savePackage(packages).pipe(first())
      .subscribe({
          next: (response) => {
              this.resetForm();
              this.packageDialog = false;
              if (response.status) {
                  this.eventChange.emit(response.status);
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
              } else {
                  this.messageService.add({ severity: 'warning', summary: 'Failed', detail: response.message, life: 3000 });
              }
          },
          error: (error) => {
              this.btnLoading = false;
              this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error.message, life: 3000 });
          },
      });
}
loadForm() {
  this.packageForm = this._formBuilder.group({
      title: ["", [Validators.required]],
      total_Bags: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      is_Unlimited:[false],
  });  
  
}


resetForm(){
  this.packageForm.reset();
  this.btnLoading = false;
}

}
