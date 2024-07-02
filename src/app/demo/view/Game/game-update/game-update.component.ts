import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GameService } from 'src/app/demo/service/game.service';
import { NamedObservableService } from 'src/app/demo/service/named-observable.service';

@Component({
  selector: 'app-game-update',
  templateUrl: './game-update.component.html',
  styleUrls: ['./game-update.component.scss']
})
export class GameUpdateComponent implements OnInit {
  gameDialog: any;
  saveGameForm: FormGroup;
  btnloading=false
  
  constructor(private _formBuilder:FormBuilder,private service:GameService
    ,private observer :NamedObservableService, private messageService: MessageService) {
      this.saveGameForm = this._formBuilder.group({
        Id:['',Validators.required],
        Title:['',Validators.required],
        Price:['',Validators.required]
      })
  
     }
  
  ngOnInit(): void {
    this.observer.getObservable('openGameUpdate').subscribe(res=>{
      if(res){
        this.setValues(res)
      }
    })
  
  }
  setValues(res) {
    this.reset();
    this.saveGameForm.patchValue({
        Id: res?.id,
        Title: res?.title,
        Price: res?.price,
    });
    this.gameDialog=true
  }
  reset(){
    this.saveGameForm.reset();
  }
  onSubmitGameForm() {
    this.btnloading=true
    if (this.saveGameForm.valid) {
      this.service.updateGame(this.saveGameForm.value).subscribe(res=>{
        this.observer.register("callGameList");
        this.observer.updateValue("callGameList",true);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Game updated Successfully' });
        this.btnloading=false;
        this.gameDialog = false;
      },err=>{
        this.btnloading=false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      })
    }
    else{
      this.btnloading=false;
    }
  }
    openNew() {
      this.reset();
      this.gameDialog=true;
    }
  

}
