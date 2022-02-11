import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  //subscription?: Subscription;
  isFetching = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.onFetchData();
  }

  // onCreatePost here??

  onUpdateUser(id: string) {
    this.router.navigate([`update/${id}`])
  }

  onDeleteUser(id: string) {
    this.userService.deleteUser(id)
    this.users = this.users.filter(item => item.id != id);
  }

  onFetchData() {
    this.isFetching = true;

    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.isFetching = false;
    })
  }

  /*ngOnDestroy(): void {
    //this.subscription?.unsubscribe();
  }*/
}
