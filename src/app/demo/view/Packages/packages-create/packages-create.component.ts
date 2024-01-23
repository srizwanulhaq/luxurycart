import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Packages } from 'src/app/demo/domain/Dao/Tours/packages';
import { PackagesService } from 'src/app/demo/service/packages.service';
import { PackagesMainComponent } from '../packages-main/packages-main.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-packages-create',
  templateUrl: './packages-create.component.html',
  styleUrls: ['./packages-create.component.scss'],
  providers:[MessageService]
})
export class PackagesCreateComponent implements OnInit {

  @Output() eventChange = new EventEmitter<Event>();
  package: Packages;
  packageDialog: boolean;
  submitted: boolean;
  packageForm:FormGroup;
  btnloading: boolean = false;
  constructor(private _service: PackagesService,
    private _formBuilder: FormBuilder,
    private cdref: ChangeDetectorRef,
    private main: PackagesMainComponent,
    private messageService: MessageService) { }
  ngOnInit(): void {
    
    this.loadForm();
    this.resetForm();
  }
  
  loadForm() {
    this.packageForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      amount: [0.0, [Validators.required]],
    });
    
  }
  openNew() {
    this.submitted = false;
    this.packageDialog = true;
    this.main.event = null;
    this.resetForm();
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

    this.addNewUser(this.packageForm.value);
  }

  addNewUser(_package: Packages) {
    
    this._service.savePackage(_package).pipe(first())
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.packageDialog = false;
            if (response.status) {
              this.eventChange.emit(response.status);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: response.message, life: 3000});
            }else {
              this.messageService.add({severity: 'warning', summary: 'Failed', detail: response.message, life: 3000});
            }
          },
          error: (error) => {
            this.btnloading = false;
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
