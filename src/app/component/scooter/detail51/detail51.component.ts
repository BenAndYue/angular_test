import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Scooter} from "../../../models/scooter";
import {Subscription} from "rxjs";
import {ScootersService} from "../../../services/scooters.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ScootersService2} from "../../../services2/scooters.service2";

@Component({
  selector: 'app-detail51',
  templateUrl: './detail51.component.html',
  styleUrls: ['./detail51.component.css']
})
export class Detail51Component implements OnInit {


  @ViewChild('edit', {static: false})

  private detailFormum: NgForm;
  public editedScooterId = -1;
  public editedScooter4: Scooter = null;
  private childParamsSubsciption: Subscription = null;


  constructor(private scooterService: ScootersService2,
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

    if (aId >= this.scooterService.scooters.length) {
      setTimeout(
          () => {
            // retry by renavigating
            console.log('No scooters yet, retrying later')
            this.getScooterToEdit(aId);
          },
          10
      )
    } else if (aId >= 0) {
      //het opslaan van de aId
      this.editedScooterId = aId;
      this.editedScooter4 = Scooter.Copy(this.scooterService.scooters[aId])
      //this.selectedScooterE(this.editedScooterId);
    } else {
      this.editedScooterId = aId;
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
    console.log(this.editedScooter4);
    this.scooterService.restPutScooter(this.editedScooter4, this.editedScooter4.id)
    //location.replace('http://localhost:4200/scooters/overview5')
    // uses the router to navigate
    this.unselectedScooter();
  }


  clickDeleter() {
    if (this.poppup()) {

      this.scooterService.restDeleteScooter(this.editedScooter4.id);
      alert('The next scooter with id ' + this.editedScooterId + 'has been removed from the saved ones.');
      this.unselectedScooter();
      //location.replace('http://localhost:4200/scooters/overview5')
    }
  }

  clickReset(){
    if (this.poppup()){
      this.editedScooter4.id = this.scooterService.scooters[this.editedScooterId].id;
      this.editedScooter4.tag = this.scooterService.scooters[this.editedScooterId].tag;
      this.editedScooter4.gpsLocation = this.scooterService.scooters[this.editedScooterId].gpsLocation;
      this.editedScooter4.batteryCharger = this.scooterService.scooters[this.editedScooterId].batteryCharger;
      this.editedScooter4.mileage = this.scooterService.scooters[this.editedScooterId].mileage;
      this.editedScooter4.status = this.scooterService.scooters[this.editedScooterId].status;
    }
  }


  cancelClick(){
    if (this.poppup()){
      this.editedScooter4 = null;
      this.editedScooterId = -1;
      this.unselectedScooter();
    }
  }
//
//
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

//
  poppup(): boolean {
    if (this.niksVeranderd()) {
      return true;
    } else {
      return confirm("Are you sure you want to discard this?")
    }
  }
//
//
  //niks is veranderd als er wel iets veranderd change...
  niksVeranderd(): boolean {
    return this.editedScooter4.equals
    (this.scooterService.scooters[this.editedScooterId]);
  }



   private unselectedScooter() {
     this.router.navigate(['..'], {relativeTo: this.activeRoute});
   }
}
