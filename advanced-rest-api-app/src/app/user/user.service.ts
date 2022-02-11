import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../shared/user.model";

@Injectable({ providedIn: 'root' })
export class UserService {
    usersChanged = new Subject<User[]>();
    private users: User[] = [];
    private user?: User;

    constructor(private http: HttpClient) {}

    setUsers(users: User[]) {
        this.users = users;
        this.usersChanged.next(this.users.slice());
    }

    getUsers() {
        return this.users.slice();
    }

    /*setUser(user: User) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }*/

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

    updateUser(id: string, userData: User) {
        return this.http
            .put(
                `https://advancedrestapi.azurewebsites.net/api/users/${id}`,
                userData
            )
            .subscribe(response => console.log(response))
    }
}