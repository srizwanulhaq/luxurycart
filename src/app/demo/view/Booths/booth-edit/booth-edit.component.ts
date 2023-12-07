import { Component, EventEmitter, OnInit, Output,Input, SimpleChange } from '@angular/core';
import { BoothMainComponent } from '../booth-main/booth-main.component';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { BoothService } from 'src/app/demo/service/booth.service';
import { MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';
import { BoothDto } from 'src/app/demo/domain/Dto/Booth/BoothDto';

@Component({
  selector: 'app-booth-edit',
  templateUrl: './booth-edit.component.html',
  styleUrls: ['./booth-edit.component.scss'],
  providers:[MessageService]
})
export class BoothEditComponent implements OnInit {
  @Output() eventChange = new EventEmitter<Event>();
  @Input() editBoothData: BoothDto;
  submitted:boolean;
  boothUpdateForm: FormGroup;
  btnLoading:boolean;
  lstBoothTypes:SelectItem[] = [];
  lstUsers: SelectItem[] = [];
  constructor(public main: BoothMainComponent,
    private _formBuilder: FormBuilder,
    private service: BoothService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadDropdown();
    
    this.loadForm();
  }

  loadForm() {
    this.boothUpdateForm = this._formBuilder.group({
      id: ["", [Validators.required]],
        title: ["", [Validators.required]],
        artitle: ["", [Validators.required]],
       // boothTypeId: ["", [Validators.required]],
        wait_Time: ["", [Validators.required]],
        latitude: ["", [Validators.required]],
        longitude: ["", [Validators.required]],
        mangersIds:[[],Validators.required],
    });  
  }
  
  loadDropdown(){
    this.service.loadMultipleSources().then(responseList => {
  
      this.lstBoothTypes = responseList.lstBoothTypes;
      this.lstUsers = responseList.lstUsers;
  });
  }
  ngOnChanges(change: SimpleChange) {
    let id=[];
    if (!!change['editBoothData'].currentValue) {
      
        const temp = change['editBoothData'].currentValue
        const group: FormGroup = this.boothUpdateForm as FormGroup;
        group.controls['title'].setValue(temp.title || "");
        group.controls['artitle'].setValue(temp.arTitle || "");
        group.controls['id'].setValue(temp.id || "");
        //group.controls['boothTypeId'].setValue(temp.conciergeBoothTypes.id || "");
        group.controls['wait_Time'].setValue(temp.wait_Time || "");
        group.controls['latitude'].setValue(temp.latitude || "");
        group.controls['longitude'].setValue(temp.longitude || "");
        if(temp.lstBoothManagers.length>0)
        {
        temp.lstBoothManagers.forEach(element => {
          id.push(element.id);
        });
        }
        else{
        id=null;
        }
        group.controls['mangersIds'].setValue(id || []);
    }
    
   }
  onSubmitForm(){
    this.btnLoading = true;
    this.submitted = true;
    if (this.boothUpdateForm.invalid) {
        this.btnLoading = false;
        return;
    }
  
    if(this.boothUpdateForm.value.mangersIds != null || this.boothUpdateForm.value.mangersIds.length > 0 )
    this.UpdateBooth(this.boothUpdateForm.value);
  }
  UpdateBooth(booth) 
  {
    this.service.updateBooth(booth).pipe(first())
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
    this.boothUpdateForm.reset();
    this.btnLoading = false;
  }
  
}
