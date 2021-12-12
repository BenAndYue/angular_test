import {Component, OnInit} from '@angular/core';
import {Scooter, scooterStatus} from "../../../models/scooter";

@Component({
  selector: 'app-overview1',
  templateUrl: './overview1.component.html',
  styleUrls: ['./overview1.component.css']
})
export class Overview1Component implements OnInit {

  public scooter: Scooter[];
  private sc: Scooter;

  constructor() {
  }
  ngOnInit(): void {
    this.scooter = [];
    for (let i = 0; i < 8; i++) {
      this.addRandomScooter();

    }
  }

//voor button
  //methode afmaken
  addRandomScooter() {
    this.sc = Scooter.createRandomScooter();
    this.scooter.push(this.sc);
  }

  AddBikeHandle() {
    this.addRandomScooter();

  }

}





