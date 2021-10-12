import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  //state management service (rdx)
  members: Member[] = [];


  constructor(private http: HttpClient) { }

  getMembers(){
    // used to store data after we load first time.
    if(this.members.length > 0) return of(this.members); // return observable 
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      // using pipe we make sure we store data on client side, so we 
      // need to make other api call
      map(members => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username:string){
    // check if we have already member stored
    const member = this.members.find(x => x.username === username);
    // if member not found, it return undifined, so if it's not undifined
    // then we return member data as observable else we go fetch the data from api

    if(member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member){
    // when we make change we also need to udpate the stored data

    return this.http.put(this.baseUrl + 'users', member).pipe(
      // since method doesn't return data
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
}
