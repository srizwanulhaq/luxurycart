import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'delete-account',
  templateUrl: './delete-account.html',
})
export class deleteAccountt implements OnInit {
    show : boolean = false
  constructor() { }

  ngOnInit(): void {
  }
sjkhs(){
debugger;
        setTimeout(() => {
            this.show = true;
            // If you want to manipulate the DOM directly (not recommended in Angular):
            // document.getElementById("successMessage").style.display = "block";
        }, 2000);
      
   
}
}
