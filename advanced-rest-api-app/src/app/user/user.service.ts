import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../shared/user.model";

@Injectable()
export class UserService {
    usersChanged = new Subject<User[]>();
    private users: User[] = [];

    constructor() {}

    setUsers(users: User[]) {
        this.users = users;
    }

    getUsers() {
        return this.users.slice();
    }
}