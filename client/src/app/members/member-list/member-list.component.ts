import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  // members: Member[]; change to observable array so we can use the stored data
// adding the $ indecates that it's observale , rather than just a normal js object

  members$: Observable<Member[]>;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    //this.loadMembers(); instead we now gets from our member service which store
    // data locally

    this.members$ = this.memberService.getMembers();
  }

////// we dont use this anymore will pull it from stored data

  // loadMembers(){
  //   this.memberService.getMembers().subscribe(members =>{
  //     this.members = members;
  //   })
  //}

}
