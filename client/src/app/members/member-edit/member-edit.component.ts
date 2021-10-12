import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/User';

import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
// reset the edit form after record saved, add it to updateMember method

  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;
  // away to prevent user from leaving the edit page after tehy started editing
  // the browser will alert that change have been saved 
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  constructor(private accountService: AccountService, 
              private memberService: MembersService,
              private toastr: ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => 
    this.user = user);
 
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }
// first we added an update method in usercontroller in api
// we create a new memberUpdateDto to map the data coming from edit page to user 
// then we create teh automap
// then we added teh update method in member service
// we create a new update method in member-edit 
// we call this method on form submit in the member-edit-html

  updateMember(){
    this.memberService.updateMember(this.member).subscribe(() =>{
      this.toastr.success('Profile updated successfully');
      //after save reset 
      this.editForm.reset(this.member);
    })
  }
}
