import {Component, OnInit} from '@angular/core';
import {ScootersService} from "../../../services/scooters.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ScootersService2} from "../../../services2/scooters.service2";

@Component({
  selector: 'app-overview5',
  templateUrl: './overview5.component.html',
  styleUrls: ['./overview5.component.css']
})
export class Overview5Component implements OnInit {
  public selected: Number;


  constructor(public scooterService: ScootersService2, public scooterService1: ScootersService, private router: Router, private activatedRoute: ActivatedRoute) {
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
    let scoot = this.scooterService1.addRandomScooter();
    this.scooterService.restPostScooter(scoot);
    console.log(scoot)
    // do not reload the app! let the service update the list of scooters and angular change management do the rest
   // location.replace('http://localhost:4200/scooters/overview5')

  }


}
