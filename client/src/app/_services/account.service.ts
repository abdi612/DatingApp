import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators'
import { User } from '../_models/User';

// service are injectable
// service are singleton
@Injectable({
  providedIn: 'root'
})

// data are not destroyed unless the browser is clossed or they move from it.
// but component are destroyed as soona s they not in use.
export class AccountService {

  baseUrl = 'https://localhost:5001/api/';

  // create observiable var to put our user in
  // RelaySubject is like a buffer object to store
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post(this.baseUrl + 'account/login',model).pipe(
      map((response: User )=>{
        const user = response
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          //add the user into observable buffer/bucker
          this.currentUserSource.next(user);
        }
      })
    );
  }

  //register
  register(model: any){
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User)=>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })

      )
  }
  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null); // remove from the observiable buffer
  }


}
