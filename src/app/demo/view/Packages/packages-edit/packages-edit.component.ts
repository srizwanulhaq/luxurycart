import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Packages } from 'src/app/demo/domain/Dao/Tours/packages';
import { PackagesMainComponent } from '../packages-main/packages-main.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackagesService } from 'src/app/demo/service/packages.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-packages-edit',
  templateUrl: './packages-edit.component.html',
  styleUrls: ['./packages-edit.component.scss'],
  providers:[MessageService]
})
export class PackagesEditComponent implements OnInit {

  @Output() eventChange = new EventEmitter<Event>();
  @Input() editPackageData: Packages;
  submitted:boolean;
  PackageUpdateForm: FormGroup;
  btnLoading:boolean;
  constructor(public main: PackagesMainComponent,
    private _formBuilder: FormBuilder,
    private service: PackagesService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.PackageUpdateForm = this._formBuilder.group({
      id: ["", [Validators.required]],
        name: ["", [Validators.required]],
        amount: [0.0, [Validators.required]],
    });  
  }
  
 
  ngOnChanges(change: SimpleChange) {
    
    if (!!change['editPackageData'].currentValue) {
      
        const temp = change['editPackageData'].currentValue
        
        const group: FormGroup = this.PackageUpdateForm as FormGroup;
        group.controls['name'].setValue(temp.name || "");
        group.controls['amount'].setValue(temp.amount || 0.0);
        group.controls['id'].setValue(temp.id || "");
        
    }
    
   }
  onSubmitForm(){
    this.btnLoading = true;
    this.submitted = true;
    if (this.PackageUpdateForm.invalid) {
        this.btnLoading = false;
        return;
    }
  
    this.UpdatePackage(this.PackageUpdateForm.value);
  }
  UpdatePackage(_package) 
  {
    this.service.updatePackage(_package).pipe(first())
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
    this.PackageUpdateForm.reset();
    this.btnLoading = false;
  }

}
