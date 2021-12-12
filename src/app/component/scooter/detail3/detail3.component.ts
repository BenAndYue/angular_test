import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";


@Component({
  selector: 'app-detail3',
  templateUrl: './detail3.component.html',
  styleUrls: ['./detail3.component.css']
})
export class Detail3Component implements OnInit {

  private scooterEditEventId: number;
  public editedScooter3: Scooter;
  buttonDisabled = false;

  @Input()
  set editedScooterId(id: number) {
    this.scooterEditEventId = id;
    this.editedScooter3 = Scooter.Copy(this.scooterSerice.scooter[id]);

  }

  get editedScootertId() {
    return this.scooterEditEventId;
  }

  @Output()
  public editScooterIdVerander = new EventEmitter<number>();

  constructor(private scooterSerice: ScootersService) {
    this.scooterSerice.scooterUpdated.subscribe((scooter: Scooter) => alert("New scooter is" + scooter));
  }




  setOnTo(scooter: Scooter) {
    this.scooterSerice.update(this.editedScootertId, scooter);
  }

  clickSave() {
    this.scooterSerice.update(this.editedScootertId, this.editedScooter3);
  }

  clickDeleter() {
    if (this.poppup()) {
      this.scooterSerice.deleteById(this.editedScootertId);
      alert('The next scooter with id ' + this.editedScootertId + 'has been removed from the saved ones.');
      this.editedScooter3.mileage = null;
      this.editedScooter3.id = null;
      this.editedScooter3.tag = null;
      this.editedScooter3.status = null;
      this.editedScooter3.batteryCharger = null;
      this.editedScooter3.gpsLocation = null;
      this.editedScooterId = -1;
    }
  }

  clickReset(){
    if (this.poppup()){
      this.editedScooter3.id = this.scooterSerice.scooter[this.editedScootertId].id;
      this.editedScooter3.tag = this.scooterSerice.scooter[this.editedScootertId].tag;
      this.editedScooter3.gpsLocation = this.scooterSerice.scooter[this.editedScootertId].gpsLocation;
      this.editedScooter3.batteryCharger = this.scooterSerice.scooter[this.editedScootertId].batteryCharger;
      this.editedScooter3.mileage = this.scooterSerice.scooter[this.editedScootertId].mileage;
      this.editedScooter3.status = this.scooterSerice.scooter[this.editedScootertId].status;
    }
  }


  cancelClick(){
    if (this.poppup()){
      this.editedScooter3 = null;
      this.editedScooterId = -1;
      this.editScooterIdVerander.emit(-1)
    }
  }


  clickClear() {
    if (this.poppup()){
      this.editedScooter3.mileage = null;
      this.editedScooter3.id = null;
      this.editedScooter3.tag = null;
      this.editedScooter3.status = null;
      this.editedScooter3.batteryCharger = null;
      this.editedScooter3.gpsLocation = null;
    }
  }

  ngOnInit(): void {
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
    return this.editedScooter3.equals
    (this.scooterSerice.scooter[this.editedScootertId]);
  }

}


