import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from "../user/user.service";
import { User } from "./user.model";
import { map, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private userService: UserService) {}

    fetchUsers() {
        let headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*')
        return this.http
            .get<User[]>(
                'https://advancedrestapi.azurewebsites.net/api/users',
                {
                    headers: headers
                }
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

    postUser(postData: User) {
        return this.http
            .post(
                'https://advancedrestapi.azurewebsites.net/api/users',
                postData
            )
            .subscribe(response => console.log(response));
    }

    deleteUser(id: string) {
        return this.http
            .delete(
                `https://advancedrestapi.azurewebsites.net/api/users/${id}`
            )
            .subscribe(response => console.log(response))
    }
}