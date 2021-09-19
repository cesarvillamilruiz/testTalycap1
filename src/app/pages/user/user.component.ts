import { Component, OnInit } from '@angular/core';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { User } from './../../Interfaces/User';
import { UserService } from './../../services/user.service';
import { AddUser } from './../../Interfaces/AddUSer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  faTrash = faTrash;

  public page = 1;
  public pageSize = 5;

  constructor(private userService: UserService) {
    this.refreshCountries();
   }

   refreshCountries() {
    this.users.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit(): void {
    this.GetUserList();
  }

  GetUserList(){
    this.userService.getAllUsers().subscribe(u => {
      this.users= u;
    });
  }

  deleUser(id){
    this.users = this.users.filter(u => u.id != id);
    this.userService.deleteUsers(id).subscribe();
  }
}
