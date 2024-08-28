import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { MyINavData } from "src/app/interfaces/MyINavData";
import { AuthenticationService } from "./authenticationservice";
import { MenuSidebarService } from "./menu.sidebar.service";

@Injectable({
    providedIn: 'root'
  })
  export class AppSidebarService {
    items$: Observable<MyINavData[]>;
    menus: any[];
    private currentUser;
    
    constructor(private authService: AuthenticationService, menuItems: MenuSidebarService) {
      this.currentUser = authService.currentUserValue;
      this.menus = menuItems.menus;
      this.items$ = this.getSidebarItems();
    }
  
    public getSidebarItems(): Observable<MyINavData []> {
      let navItems: MyINavData [] = new Array<MyINavData>();
      this.menus.forEach((item) =>
      {
        if(this.currentUser.accessModules.some(x => x.name === item.label))
        {
          navItems.push(item);
        }
      });
      
      return of(navItems);
   }
  }
  