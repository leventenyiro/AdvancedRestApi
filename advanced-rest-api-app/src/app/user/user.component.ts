import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  users: User[] = [];
  subscription?: Subscription;
  isFetching = false;

  constructor(private dataStorageService: DataStorageService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.onFetchData();
  }

  // onCreatePost here??

  onUpdateUser(id: string) {
    this.router.navigate([`update/${id}`])
  }

  onDeleteUser(id: string) {
    this.dataStorageService.deleteUser(id)
    this.users = this.users.filter(item => item.id != id);
    this.userService.setUsers(this.users)
  }

  onFetchData() {
    this.isFetching = true;
    this.dataStorageService.fetchUsers().subscribe();
    this.subscription = this.userService.usersChanged
      .subscribe(
        (users: User[]) => {
          this.users = users
          this.isFetching = false;
        }
      )
    this.users = this.userService.getUsers();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
