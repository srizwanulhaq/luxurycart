import { Component, Input, OnInit } from '@angular/core';
import { UsersDao } from 'src/app/demo/domain/Dao/User/UsersDao';
import { UserService } from 'src/app/demo/service/user.service';
import { UserMainComponent } from '../user-main/user-main.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  private _details:UsersDao;

  
  constructor(public main: UserMainComponent,
    private _service: UserService,) { }
  
  ngOnInit(): void {
  }

  @Input() 
  set details(value: UsersDao) {
    if (value) {
     // this.getParentName(value.parentId)
      this._details = value;
    }
  }

  get details(): UsersDao {
    return this._details;
  }


//   getParentName(parentId) {
//     this.service.getParent(parentId).subscribe(responseList => {
//         this.parentname = responseList.vehicleDetails;
       
//     });
// }

}
