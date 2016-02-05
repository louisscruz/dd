import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, Router} from 'angular2/router';
import {HTTP_PROVIDERS, Http, ConnectionBackend} from 'angular2/http';
import {Collapse} from 'ng2-bootstrap/ng2-bootstrap';

import {AuthService} from '../services/auth/authService';
import {AlertService} from '../services/alerts/alertsService';

@Component({
  selector: 'navbar',
  directives: [ROUTER_DIRECTIVES, Collapse],
  styles: [ require('../global-variables.scss'), require('./navbar.scss') ],
  template: require('./navbar.html'),
  providers: [Http, ConnectionBackend, HTTP_PROVIDERS, AuthService]
})
export class Navbar {
  private isCollapsed: boolean = true;
  private toggleCollapse: any;
  private collapse: any;
  private logout: any;
  constructor(
    private http: Http,
    private router: Router,
    private _authService: AuthService) {

    this.toggleCollapse = function() {
      this.isCollapsed = !this.isCollapsed;
    };
    this.collapse = function() {
      this.isCollapsed = true;
    };
    this.logout = function() {
      _authService.logout()
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => {
          _authService.deleteJwt();
          _authService.isAuth();
          this.router.navigate(['Home']);
        }
      );
    };
  }
}
