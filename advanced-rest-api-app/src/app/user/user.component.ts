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
  users: User[] = []
  subscription!: Subscription;
  isFetching = false
  error = ""

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.onFetchData();
  }

  onUpdateUser(id: string) {
    this.router.navigate([`update/${id}`])
  }

  onDeleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: () => this.users = this.users.filter(item => item.id != id),
      error: err => this.error = err
    })
  }

  onFetchData() {
    this.isFetching = true

    //this.subscription = this.userService.getUsers().subscribe({
    this.userService.getUsers().subscribe({
      next: users => this.users = users,
      error: err => this.error = err,
      complete: () => this.isFetching = false
    });
  }
}
