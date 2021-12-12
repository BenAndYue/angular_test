import {Component, OnInit} from '@angular/core';
import {Scooter, scooterStatus} from "../../../models/scooter";

@Component({
  selector: 'app-overview2',
  templateUrl: './overview2.component.html',
  styleUrls: ['./overview2.component.css']
})
export class Overview2Component implements OnInit {

  public scooter: Scooter[];
  public selected: Scooter;
  private sc: Scooter;

  constructor() {
  }

  ngOnInit(): void {
    this.scooter = [];
    for (let i = 0; i < 8; i++) {
      this.addRandomScooter();

    }
  }

  public select(scooter: Scooter){
    this.selected = scooter
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

