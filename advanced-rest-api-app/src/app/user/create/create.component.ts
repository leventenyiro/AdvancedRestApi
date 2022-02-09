import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreateUser(postData: User) {
    this.dataStorageService.postUser(postData);
    this.router.navigate(['user'])
  }
}
