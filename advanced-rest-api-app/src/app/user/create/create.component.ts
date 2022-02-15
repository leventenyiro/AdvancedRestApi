import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  //errorName: string = "Name is required";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreateUser(data: any) {
    /*if (condition) {
      data.form.controls["name"].status = "INVALID"
      this.errorName = "Name must be 3 char"
    } else {*/
      this.userService.addUser(data.value)
      this.router.navigate(['user'])
    //}
  }
}
