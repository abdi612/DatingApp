import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  // we use account service to login our user
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
 
  }

  login(){
    // we use our account service to login
    // this observable to so we need to subscribe to listen
    this.accountService.login(this.model).subscribe(response=>{
      console.log(response);
    },error =>{
      console.log(error);
    });
  }

  logout(){
    this.accountService.logout();
  };

}
