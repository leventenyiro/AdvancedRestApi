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

  constructor(private dataStorageService: DataStorageService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.onFetchData();
  }

  onDeleteUser(id: string) {
    this.dataStorageService.deleteUser(id)
    this.users = this.users.filter(item => item.id != id);
    this.userService.setUsers(this.users)
    //this.onFetchData()
  }

  onFetchData() {
    this.dataStorageService.fetchUsers().subscribe();
    this.subscription = this.userService.usersChanged
      .subscribe(
        (users: User[]) => {
          this.users = users
        }
      )
    this.users = this.userService.getUsers();
    //this.router.navigate(['user'])
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
