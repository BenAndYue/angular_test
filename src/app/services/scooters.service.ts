import {Injectable, EventEmitter} from '@angular/core';
import {Scooter, scooterStatus} from "../models/scooter";

@Injectable({
  providedIn: 'root'
})
export class ScootersService {


  public scooter: Scooter[];
  scooterUpdated = new EventEmitter<Scooter>();


  constructor() {
    this.scooter = [];
    for (let i = 0; i < 11; i++) {
      this.addRandomScooter();
    }
  }

  Save(scooter: Scooter): number {

    for (let i = 0; i < this.scooter.length; i++) {
      this.scooter.push(scooter)
    }
    return this.scooter.length;
  }

  update(idx: number, scooter: Scooter) {
    this.scooter[idx].mileage = scooter.mileage;
    this.scooter[idx].status = scooter.status;
    this.scooter[idx].batteryCharger = scooter.batteryCharger;
    this.scooter[idx].tag = scooter.tag;
    this.scooter[idx].gpsLocation = scooter.gpsLocation;

  }

  deleteById(idx: number) {
    this.scooter.splice(idx, 1)
  }

  addRandomScooter(): Scooter {
    const scoot = new Scooter();
    scoot.id = 30001 + Math.floor(Math.random() * 100);
    scoot.mileage = Math.floor(Math.random() * 1001);
    scoot.status = this.getRandomStatus();
    scoot.batteryCharger = this.getBatteryCharge();
    scoot.tag = this.makeTag();
    scoot.gpsLocation = this.getGPSLocatioLang() + 'N ' + this.getGPSLocatioLong() + 'E';

    if (scoot.status === scooterStatus.INUSE) {
      scoot.gpsLocation = '';
    }

    this.scooter.push(scoot)
    return scoot;

  }

  getGPSLocatioLong() {
    var begin = 52379189
    var eind = Math.floor(Math.random() * 10);
    begin += eind
    return begin;
  }

  getGPSLocatioLang() {
    var begin = 4899431
    var eind = Math.floor(Math.random() * 10);
    begin += eind
    return begin;
  }

  getRandomStatus(): scooterStatus {

    const getal = Math.floor(Math.random() * Math.floor(3) + 1);
    if (getal === 1) {
      return scooterStatus.IDLE;
    }
    if (getal === 2) {
      return scooterStatus.INUSE;
    }
    if (getal === 3) {
      return scooterStatus.MAINTENANCE;
    } else {
      return null;
    }
  }

  getBatteryCharge() {
    var batteryPercent = Math.floor(Math.random() * 100);
    if (batteryPercent < 5) {
      batteryPercent = 5
    }
    return batteryPercent;
  }

  makeTag() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;

  }


}
