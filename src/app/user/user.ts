import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
//import {TAB_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Tab} from '../directives/tabs/tab';
import {Tabset} from '../directives/tabs/tabset';

import {User} from '../datatypes/user/user';
import {Post} from '../datatypes/post/post';
import {Comment} from '../datatypes/comment/comment';
import {AuthService} from '../services/auth/authService';
import {UserService} from '../services/users/usersService';

@Component({
  selector: 'user-detail',
  directives: [Tab, Tabset],
  template: require('./user.html'),
  providers: [UserService]
})

export class UserDetail implements OnInit {
  private user: User;
  private posts: Post[];
  private comments: Comment[];

  constructor(
    private _router: Router,
    private _routeParams: RouteParams,
    private _userService: UserService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    let id = this._routeParams.get('id');
    this._userService.getUser(id)
    .subscribe(
      res => this.user = res
    );
    this._userService.getUserPosts(id)
    .subscribe(
      res => this.posts = res
    );
    this._userService.getUserComments(id)
    .subscribe(
      res => this.comments = res
    );
  }
}
