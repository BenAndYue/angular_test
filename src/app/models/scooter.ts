
export class Scooter {
  public status: scooterStatus;
  public gpsLocation: string;
  public id: number;
  public tag: string;
  public batteryCharger: number;
  public mileage: number;

  public scooter: Scooter[];
  public selected: Scooter;
  public displayScooter: Scooter;
  public selectedindex: number;

  static Copy(sc: Scooter): Scooter {
    return Object.assign(new Scooter(), sc);
  }

  public  equals(i): boolean {
    return this.id === i.id &&
      this.tag === i.tag &&
      this.gpsLocation === i.gpsLocation &&
      this.batteryCharger === i.batteryCharger &&
      this.status === i.status &&
      this.mileage === i.mileage;

  }



  public static createRandomScooter():Scooter{
    let sc = new Scooter();
    sc.id = 30001 + Math.floor(Math.random() * 100);
    sc.mileage = Math.floor(Math.random() * 1001);


    //Status
    const statusGetal = Math.floor(Math.random() * Math.floor(3) + 1);
    if (statusGetal === 1) {
      sc.status = scooterStatus.IDLE
    }
    if (statusGetal === 2) {
      sc.status = scooterStatus.INUSE
    }
    if (statusGetal === 3) {
      sc.status = scooterStatus.MAINTENANCE
    }
    //batterycharge
    var batteryPercent = Math.floor(Math.random() * 100);
    if (batteryPercent < 5) {
      sc.batteryCharger = 5;
    } else sc.batteryCharger = batteryPercent;

    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    sc.tag = result;

    //gps
    var begin = 52379189
    var eind = Math.floor(Math.random() * 10);
    begin += eind
    var long = begin;

    var beginn = 4899431
    var eindn = Math.floor(Math.random() * 10);
    beginn += eindn

    var lat = beginn;

    sc.gpsLocation = lat + "N " + lat + "E"

    if (sc.status === scooterStatus.INUSE) {
      sc.gpsLocation = '';
    }

    return sc;
  }

}

export enum scooterStatus {
  IDLE = 'IDLE',
  INUSE = 'INUSE',
  MAINTENANCE = ' MAINTENANCE'
}










