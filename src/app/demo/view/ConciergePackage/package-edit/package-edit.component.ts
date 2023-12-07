import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConciergePackages } from 'src/app/demo/domain/Dao/Concierge/concierge-packages';
import { PackageMainComponent } from '../package-main/package-main.component';
import { ConciergePackageService } from 'src/app/demo/service/concierge-package.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-package-edit',
  templateUrl: './package-edit.component.html',
  styleUrls: ['./package-edit.component.scss'],
  providers:[MessageService]
})
export class PackageEditComponent implements OnInit {

  @Output() eventChange = new EventEmitter<Event>();
  @Input() editPackageData: ConciergePackages;
  submitted:boolean;
  packageForm: FormGroup;
  btnLoading:boolean;
  is_Unlimited:boolean=false;
  constructor(public main: PackageMainComponent,
    private _formBuilder: FormBuilder,
    private service: ConciergePackageService,
    public messageService:MessageService) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.packageForm = this._formBuilder.group({
      title: ["", [Validators.required]],
      total_Bags: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      is_Unlimited: ["", [Validators.required]],
      id: ["", [Validators.required]],
  });  
  }
  

  ngOnChanges(change: SimpleChange) {
    let id=[];
    
    if (!!change['editPackageData'].currentValue) {
      
        const temp = change['editPackageData'].currentValue
        const group: FormGroup = this.packageForm as FormGroup;
        group.controls['title'].setValue(temp.title || "");
        this.is_Unlimited = temp.is_Unlimited;
        group.controls['total_Bags'].setValue(temp.total_Bags || "");
        group.controls['id'].setValue(temp.id || "");
        group.controls['amount'].setValue(temp.amount || "");
        group.controls['is_Unlimited'].setValue(temp.is_Unlimited || "");
    }
    
   }
  onSubmitForm(){
    this.btnLoading = true;
    this.submitted = true;
    if (this.packageForm.invalid) {
        this.btnLoading = false;
        return;
    }
    this.UpdatePackage(this.packageForm.value);
  }
  UpdatePackage(booth) 
  {
    this.service.updatePackage(booth).pipe(first())
        .subscribe({
            next: (response) => {
                this.resetForm();
                this.main.editPanelActive = false;
                this.main.bottomPanelActive=false;
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

  resetForm(){
    this.packageForm.reset();
    this.btnLoading = false;
  }
}
