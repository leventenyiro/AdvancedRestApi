import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  id?: string;

  constructor(private route: ActivatedRoute, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")!
  }

  getUser() {
    this.dataStorageService.getUser(this.id).subscribe(user => user)
  }

}
