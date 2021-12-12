import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../../session/session.service";

@Component({
  selector: 'app-header-sb',
  templateUrl: './header-sb.component.html',
  styleUrls: ['./header-sb.component.css']
})
export class HeaderSbComponent implements OnInit {
  today: number = Date.now();
  opening: string = "";
  username: string = "";
  constructor(private ss: SessionService) { }

  async ngOnInit() {
    await this.fetchUser();


  }

  private async fetchUser() {


    if (this.ss.isAutenticated() == true ){
      this.opening = "Welkom terug"

      let a = window.sessionStorage.getItem("username")
      this.username = a;
    } else {
      this.opening = "Hallo visiter"
    }





  }
}
