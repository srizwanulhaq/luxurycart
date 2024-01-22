import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Points } from 'src/app/demo/domain/Dao/Tours/points';
import { PointsService } from 'src/app/demo/service/points.service';
import { PointsMainComponent } from '../points-main/points-main.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-points-create',
  templateUrl: './points-create.component.html',
  styleUrls: ['./points-create.component.scss'],
  providers:[MessageService]
})
export class PointsCreateComponent implements OnInit {

  @Output() eventChange = new EventEmitter<Event>();
  point: Points;
  pointDialog: boolean;
  submitted: boolean;
  pointForm:FormGroup;
  btnloading: boolean = false;
  constructor(private _service: PointsService,
    private _formBuilder: FormBuilder,
    private cdref: ChangeDetectorRef,
    private main: PointsMainComponent,
    private messageService: MessageService) { }
  ngOnInit(): void {
    
    this.loadForm();
    this.resetForm();
  }
  
  loadForm() {
    this.pointForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      name_AR: ["", [Validators.required]],
    });
    
  }
  openNew() {
    this.submitted = false;
    this.pointDialog = true;
    this.main.event = null;
    this.resetForm();
  }
  
  hideDialog(){
    this.pointDialog = false;
  }

  onSubmitForm() {

    this.btnloading = true;
    
    if (this.pointForm.invalid) {
      this.btnloading = false;
      return;
    }

    this.addNewUser(this.pointForm.value);
  }

  addNewUser(point: Points) {
    
    this._service.savePoint(point).pipe(first())
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.pointDialog = false;
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
    this.pointForm.reset();
    this.btnloading = false;
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

}
