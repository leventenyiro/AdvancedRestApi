import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { User } from '../shared/user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  users: User[];
  subscription: Subscription;

  constructor(private dataStorageService: DataStorageService, private userService: UserService) {}
  //constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.onFetchData();
    console.log(this.userService.getUsers())
    //this.dataStorageService.fetchUsers().subscribe();
    
    this.subscription = this.userService.usersChanged
      .subscribe(
        (users: User[]) => {
          this.users = users
        }
      )
    this.users = this.userService.getUsers();
    
  }

  onFetchData() {
    this.dataStorageService.fetchUsers().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
