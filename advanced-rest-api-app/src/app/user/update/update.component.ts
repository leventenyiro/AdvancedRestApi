import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { User } from 'src/app/shared/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
@Injectable()
export class UpdateComponent implements OnInit {
  id?: string;
  user?: User;
  subscription?: Subscription;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")!

    this.userService.getUser(this.id).subscribe(
      user => {
        this.user = user;
      }
    )
  }


}
