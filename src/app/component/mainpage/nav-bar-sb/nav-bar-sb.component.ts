import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../../session/session.service";

@Component({
  selector: 'app-nav-bar-sb',
  templateUrl: './nav-bar-sb.component.html',
  styleUrls: ['./nav-bar-sb.component.css']
})
export class NavBarSbComponent implements OnInit {

  user: any;
  constructor(private ss: SessionService) { }

  async ngOnInit() {
    await this.fetchUser();
  }
  private async fetchUser() {

    if (this.ss.isAutenticated() == true) {
      const localUser = window.localStorage.getItem("token");
      this.user = localUser;
    } else {
      return;
    }
  }


  loggedIn() {
    return Boolean(this.user);
  }

  onLogout() {

  //methode to service
    this.ss.deleteLocalUser();
  }

}
