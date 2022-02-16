import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/user/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
@Injectable()
export class UpdateComponent implements OnInit {
  id!: string;
  user?: User;
  subscription?: Subscription;
  isFetching = false;
  error = "";

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")!
    
    this.isFetching = true;

    this.userService.getUser(this.id!).subscribe(
      user => {
        this.user = user;
        this.isFetching = false;
      }
    )
  }

  getUser() {
    this.isFetching = true;

    this.userService.getUser(this.id!).subscribe({
      next: user => {
        this.user = user;
        this.isFetching = false;
      },
      error: err => {
        this.error = err;
        this.isFetching = false;
      }
    });
  }

  onUpdateUser(user: User) {
    this.userService.updateUser(this.id, user).subscribe({
      next: () => this.router.navigate(['user']),
      error: err => this.error = err
    })
  }
}
