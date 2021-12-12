import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {SessionService} from "../../session/session.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html',
  styleUrls: ['./sign-on.component.css']
})
export class SignOnComponent implements OnInit {


  constructor(private sr: SessionService) {
  }

  ngOnInit(): void {
  }

  onSigIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.sr.signin(email, password);
    console.log(email + ' and ' + password);

  }


}
