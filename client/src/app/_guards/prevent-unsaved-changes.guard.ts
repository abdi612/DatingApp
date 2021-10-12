import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  // used to prevent page redirect from edit profile without saving data.
  canDeactivate(
    component: MemberEditComponent):  boolean {
    if(component.editForm.dirty){
      return confirm('Are you sure you want to contininue ? Any unsaved changes will be lost');

    }
    return true;
  }
  
}
