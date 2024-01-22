import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { PointsService } from 'src/app/demo/service/points.service';
import { PointsMainComponent } from '../points-main/points-main.component';
import { Points } from 'src/app/demo/domain/Dao/Tours/points';

@Component({
  selector: 'app-points-edit',
  templateUrl: './points-edit.component.html',
  styleUrls: ['./points-edit.component.scss'],
  providers:[MessageService]
})
export class PointsEditComponent implements OnInit {

  
  @Output() eventChange = new EventEmitter<Event>();
  @Input() editPointData: Points;
  submitted:boolean;
  PointUpdateForm: FormGroup;
  btnLoading:boolean;
  constructor(public main: PointsMainComponent,
    private _formBuilder: FormBuilder,
    private service: PointsService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.PointUpdateForm = this._formBuilder.group({
      id: ["", [Validators.required]],
        name: ["", [Validators.required]],
        name_AR: ["", [Validators.required]],
    });  
  }
  
 
  ngOnChanges(change: SimpleChange) {
    
    if (!!change['editPointData'].currentValue) {
      
        const temp = change['editPointData'].currentValue
        
        const group: FormGroup = this.PointUpdateForm as FormGroup;
        group.controls['name'].setValue(temp.name || "");
        group.controls['name_AR'].setValue(temp.name_AR || "");
        group.controls['id'].setValue(temp.id || "");
        
        
    }
    
   }
  onSubmitForm(){
    this.btnLoading = true;
    this.submitted = true;
    if (this.PointUpdateForm.invalid) {
        this.btnLoading = false;
        return;
    }
  
    this.UpdatePoint(this.PointUpdateForm.value);
  }
  UpdatePoint(point) 
  {
    this.service.updatePoint(point).pipe(first())
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
    this.PointUpdateForm.reset();
    this.btnLoading = false;
  }
}
