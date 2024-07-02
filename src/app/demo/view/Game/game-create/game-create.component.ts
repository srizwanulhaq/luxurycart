import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GameService } from 'src/app/demo/service/game.service';
import { NamedObservableService } from 'src/app/demo/service/named-observable.service';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss']
})
export class GameCreateComponent implements OnInit {
gameDialog: any;
saveGameForm: FormGroup;
btnloading=false

constructor(private _formBuilder:FormBuilder,private service:GameService
  ,private observer :NamedObservableService, private messageService: MessageService) {
    this.saveGameForm = this._formBuilder.group({
      Title:['',Validators.required],
      Price:['',Validators.required]
    })

   }

ngOnInit(): void {
}
reset(){
  this.saveGameForm.reset();
}
onSubmitGameForm() {
  this.btnloading=true
  if (this.saveGameForm.valid) {
    this.service.createGame(this.saveGameForm.value).subscribe(res=>{
      this.observer.register("callGameList");
      this.observer.updateValue("callGameList",true);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Game Created Successfully' });
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
throw new Error('Method not implemented.');
}
  openNew() {
    this.reset();
    this.gameDialog=true;
  }

}
