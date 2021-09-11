import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //passing data parent to child
  // @Input() usersFromHomeComponent: any;
  //passing data child to parent 

  /*
    when cancel button on register form is pressed we want to change/set 
    registermode in home compenent to false

    1.  use Output() variable with EventEmitter from angular/core
    2.  in cancel function that gets called by click on cancel button to emit false;
    3. in home component template, inside the app-register a child component, add the
        output variable   (cancelRegister)=""
    4. create a new function home compent cancelRegisterMode(), 
    which sets the registermode to event passed from the click of cancel button (false)
  */
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe(response =>{
      this.cancel()
    },error =>{
      this.toastr.error(error.error)
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
