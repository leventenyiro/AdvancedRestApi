import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UserService } from "../user/user.service";
import { User } from "./user.model";
import { map, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private userService: UserService) {}

    fetchUsers() {
        return this.http
            .get<User[]>(
                'https://advancedrestapi.azurewebsites.net/api/users'
            )
            .pipe(
                map(users => {
                    return users.map(user => {
                        return {
                            ...user
                        }
                    })
                }),
                tap(users => {
                    this.userService.setUsers(users);
                })
            )
    }
}