import {Injectable} from '@angular/core';
import {Scooter, scooterStatus} from "../models/scooter";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ScootersService2 {
  private scooterUrl: String;
  public scooters: Scooter[] = [];

//voorbeeld opgave


  constructor(private  http: HttpClient) {
    this.scooterUrl ="http://localhost:8085/scooters";
    this.restGetScooter().subscribe(
      (sc) => {
        if (!(sc == null)) {
          this.scooters = sc;
        }
      }, error => {
        console.log(error);
      }

    );
  }


  //FindAll methode
  public restGetScooter(): Observable<Scooter[]> {
    // @ts-ignore
    return this.http.get<Scooter[]>(this.scooterUrl).pipe(shareReplay(1));
  }

  restPostScooter(scooter: Scooter){
    //send request
    // @ts-ignore
    let obsScooter:Observable<Scooter> = this.http.post<Scooter>(this.scooterUrl, scooter).pipe(shareReplay(1));
    obsScooter.subscribe(
        scoot => {
        this.scooters.push(Scooter.Copy(scoot))
        console.log(scoot);
      },
      error => console.log(error)
    );
    return obsScooter;
  }
  restDeleteScooter(id : number){
    let scootObs = this.http.delete<Scooter>(this.scooterUrl +"/" + id).pipe(shareReplay(1));
    scootObs.subscribe(
      sc => {
        console.log("Subscribe naar x")
      },
      error => console.log(error)
    );
    this.scooters.splice(id,1)
return scootObs;
  }


  restPutScooter(scooter: Scooter, id: number){
    let scootObs = this.http.put<Scooter>((this.scooterUrl +"/" + id),scooter ).pipe(shareReplay(1));
    scootObs.subscribe(
      sc => {
        // replace the value in the cached array
        let scIndex = this.scooters.findIndex(sc => sc.id == id);
        this.scooters[scIndex] = scooter;
        console.log("Saved ", scooter)
      },
      error => console.log(error)
    )
    return scootObs;
  }



}
