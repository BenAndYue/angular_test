import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Scooter} from "../../../models/scooter";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ScootersService} from "../../../services/scooters.service";
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-detail4',
  templateUrl: './detail4.component.html',
  styleUrls: ['./detail4.component.css']
})
export class Detail4Component implements OnInit, OnDestroy {

  @ViewChild('edit', {static: false})
  private detailFormum: NgForm;

  public editedScooterId = -1;
  public editedScooter4: Scooter = null;
  private childParamsSubsciption: Subscription = null;

  constructor(private scooterService: ScootersService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.childParamsSubsciption = this.activeRoute.queryParams
      .subscribe((sParams) => {
        this.setup(sParams, 'from router scooter')
      })
  }

  private setup(sParams: Params, debug?: string) {
    console.log("detail setup= " + debug + " id= " + sParams['id']);
    this.getScooterToEdit(sParams['id'] || -1)
  }

  private getScooterToEdit(aId: number) {

    if (this.editedScooterId === aId) {
      return
    }

    //het opslaan van de aId
    this.editedScooterId = aId;
    this.selectedScooterE(this.editedScooterId);

    if (aId >= 0 && aId < this.scooterService.scooter.length) {
      this.editedScooter4 = Scooter.Copy(this.scooterService.scooter[aId])

    } else {
      this.editedScooter4 = null;
    }


  }

  private selectedScooterE(aId: number) {
    this.router.navigate([],{relativeTo: this.activeRoute,queryParams: {id: aId}} )
  }

  ngOnDestroy() {
    this.childParamsSubsciption && this.childParamsSubsciption.unsubscribe();
  }



  clickSave() {
    this.scooterService.update(this.editedScooterId, this.editedScooter4);
  }

  clickDeleter() {
    if (this.poppup()) {
      this.scooterService.deleteById(this.editedScooterId);
      alert('The next scooter with id ' + this.editedScooterId + 'has been removed from the saved ones.');
      this.editedScooter4.mileage = null;
      this.editedScooter4.id = null;
      this.editedScooter4.tag = null;
      this.editedScooter4.status = null;
      this.editedScooter4.batteryCharger = null;
      this.editedScooter4.gpsLocation = null;
      this.editedScooterId = -1;
    }
  }

  clickReset(){
    if (this.poppup()){
      this.editedScooter4.id = this.scooterService.scooter[this.editedScooterId].id;
      this.editedScooter4.tag = this.scooterService.scooter[this.editedScooterId].tag;
      this.editedScooter4.gpsLocation = this.scooterService.scooter[this.editedScooterId].gpsLocation;
      this.editedScooter4.batteryCharger = this.scooterService.scooter[this.editedScooterId].batteryCharger;
      this.editedScooter4.mileage = this.scooterService.scooter[this.editedScooterId].mileage;
      this.editedScooter4.status = this.scooterService.scooter[this.editedScooterId].status;
    }
  }
//TODO

  cancelClick(){
    if (this.poppup()){
      this.editedScooter4 = null;
      this.editedScooterId = -1;
      this.unselectedScooter();
    }
  }


  clickClear() {
    if (this.poppup()){
      this.editedScooter4.mileage = null;
      this.editedScooter4.id = null;
      this.editedScooter4.tag = null;
      this.editedScooter4.status = null;
      this.editedScooter4.batteryCharger = null;
      this.editedScooter4.gpsLocation = null;
    }
  }


  poppup(): boolean {
    if (this.niksVeranderd()) {
      return true;
    } else {
      return confirm("Are you sure you want to discard this?")
    }
  }


  //niks is veranderd als er wel iets veranderd change...
  niksVeranderd(): boolean {
    return this.editedScooter4.equals
    (this.scooterService.scooter[this.editedScooterId]);
  }


  private unselectedScooter() {
    this.router.navigate(['..'], {relativeTo: this.activeRoute});
  }
}
