import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {HTTP_PROVIDERS, Http, Headers} from 'angular2/http';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {PAGINATION_DIRECTIVES, Pagination} from 'ng2-bootstrap/ng2-bootstrap';

import {PostService} from '../services/posts/postsService';
import {Post} from '../datatypes/post/post';

@Component({
  selector: 'posts',
  template: require('./posts.html'),
  directives: [Pagination, PAGINATION_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers: [PostService, HTTP_PROVIDERS]
})

export class Posts implements OnInit {
  private posts: Array<Post>;
  private totalItems: number = 100;
  private itemsPerPage: number = 30;
  private currentPage: number = 1;
  private pageOffset: number = 0;
  private perPage: number = 30;

  constructor(private _router: Router, private _postService: PostService) { }

  setPageOffset(currentPage) {
    this.pageOffset = ((this.currentPage - 1) * this.perPage);
  }
  getPosts(page, per_page) {
    this._postService.getPosts(page, per_page)
    .subscribe(
      res => {
        this.setPageOffset(this.currentPage);
        this.posts = res;
      },
      err => console.log(err),
      () => console.log('finished')
    );
  }
  ngOnInit() {
    this.getPosts(this.currentPage, this.perPage);
  }
  onSelectPost(id: number) {
    this._router.navigate( ['PostDetail', { id: id }]);
  }
  onSelectUser(id: number) {
    this._router.navigate( ['UserDetail', { id: id }]);
  }
}
