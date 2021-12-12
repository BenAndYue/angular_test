import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ScootersService} from "../../../services/scooters.service";

@Component({
  selector: 'app-overview4',
  templateUrl: './overview4.component.html',
  styleUrls: ['./overview4.component.css']
})
export class Overview4Component implements OnInit {

  public selected: Number;

  constructor(public scooterService : ScootersService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  onselect(editedScooter) {
    this.selected = editedScooter
    ;
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute, queryParams: {id: this.selected}}
    );


  }

  clickHandle() {
    this.scooterService.addRandomScooter()
    for (let i = 0; i < this.scooterService.scooter.length; i++) {
      this.onselect(i)
      this.router.navigate(['edit'], {relativeTo: this.activatedRoute, queryParams: {id: this.selected}})
    }

  }


}
