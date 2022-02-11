import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject, tap } from "rxjs";
import { User } from "./user.model";

@Injectable({ providedIn: 'root' })
export class UserService {
    usersChanged = new Subject<User[]>();
    private users: User[] = [];

    constructor(private http: HttpClient) {}

    getUsers() {
        let headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*')
        return this.http
            .get<User[]>(
                'https://advancedrestapi.azurewebsites.net/api/users',
                {
                    headers: headers
                }
            ).pipe(users => {
                return users;
            })
    }

    addUser(user: User) {
        return this.http
        .post(
            'https://advancedrestapi.azurewebsites.net/api/users',
            user
        )
        .subscribe(response => {
            console.log(response)
            this.users.push(user);
        })
    }

    getUser(id: string) {
        let headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*')
        return this.http
            .get<User>(
                `https://advancedrestapi.azurewebsites.net/api/users/${id}`,
                {
                    headers: headers
                }
            )
            .pipe(user => {
                return user;
            })
    }

    updateUser(id: string, user: User) {
        return this.http
            .put(
                `https://advancedrestapi.azurewebsites.net/api/users/${id}`,
                user
            )
            .subscribe(response => console.log(response))
    }

    deleteUser(id: string) {
        return this.http
            .delete(
                `https://advancedrestapi.azurewebsites.net/api/users/${id}`
            )
            .subscribe(response => console.log(response))
    }
}