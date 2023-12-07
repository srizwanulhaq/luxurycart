import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../demo/service/authenticationservice';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective {

  private currentUser;
  private permissions = [];

  constructor(private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthenticationService) { }

    ngOnInit(): void {
      // this.authService.currentUser.subscribe(user=>{
      //   this.currentUser = user;
      // })

      this.currentUser = this.authService.currentUserValue;
      this.updateView();
    }

  @Input()
  set hasPermission(val) {
    this.permissions = val;
    this.updateView();
  }

  

  updateView() {

    if (this.checkPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkPermission() {
    let hasPermission = false;

    if (this.currentUser && this.currentUser.accessModules) {

      for (const checkPermission of this.permissions) {

        const permissionFound = this.currentUser.accessModules.some((row)=>
        {
          return row.permission.some(x => x.toUpperCase() === checkPermission.toUpperCase());
        });

        if (permissionFound) {
          hasPermission = true;
        }
      }
    }
    return hasPermission;
  }
}
