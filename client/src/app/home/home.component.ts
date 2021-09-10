import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// this comment is also responsible of passing data down to register components

export class HomeComponent implements OnInit {

  registerMode = false;

  constructor() { }

  ngOnInit(): void {
    // this.getUsers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  // getUsers(){
  //   this.http.get('https://localhost:5001/api/users').subscribe(users => {
  //     this.users = users
  //     //console.log('current users' + JSON.stringify(this.users))
  // }, error=>{
  //   console.log(error)
  // });
  // }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
}
