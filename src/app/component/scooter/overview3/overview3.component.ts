import {Component, OnInit} from '@angular/core';
import {ScootersService} from "../../../services/scooters.service";


@Component({
  selector: 'app-overview3',
  templateUrl: './overview3.component.html',
  styleUrls: ['./overview3.component.css']
})
export class Overview3Component implements OnInit {

  public gekozenIndex: number;

  constructor(public scooterService: ScootersService) {
  }

  ngOnInit(): void {
  }

  onSelect(veranderScooterId) {
    this.gekozenIndex = veranderScooterId;
  }

  clickHandle() {
    this.scooterService.addRandomScooter();
    for (let i = 0; i < this.scooterService.scooter.length; i++) {
      this.onSelect(i);
    }
  }

}
