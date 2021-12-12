package web.esserver.models;


import com.fasterxml.jackson.annotation.JsonView;


import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Entity

@NamedQueries({
//  Find all methode
  @NamedQuery(name = "Scooter-find_all", query = "SELECT sc FROM Scooter sc"),

//  select waar status == aan de gegeven status
  @NamedQuery(name = "Scooter-find_by_status", query = "SELECT sc FROM Scooter sc WHERE sc.status =?1"),
  @NamedQuery(name = "Scooter-find_by_battery", query = "SELECT sc FROM Scooter sc WHERE sc.batteryCharger <=?1 "),
  @NamedQuery(name = "Trip_find_current_from_scooter", query = "SELECT sc FROM Scooter sc WHERE sc.status = 'INUSE' ")


})
public class Scooter {
  private static long lastId = 0;
  @JsonView(sumAll.class)
  @GeneratedValue()
  @Id
  private long id;
  @JsonView(sumAll.class)
  private String tag;

  @JsonView(sumAll.class)
  private String status;
  private String gpsLocation;

  @JsonView(sumAll.class)
  private int batteryCharger;
  private int mileage;

  @OneToMany(mappedBy = "scooter")
  private List<Trip> trips = new ArrayList<>();

  public List<Trip> getTrips() {
    return trips;
  }

  public void addTrips(Trip trip) {
    this.trips.add(trip);
    trip.setScooter(this);
  }

  public void removeTrips(Trip trip) {
    this.trips.remove(trip);

  }

  public static Trip startNewTrip(LocalDateTime startDateTime) {

    Trip trip = new Trip(0, "3", LocalDateTime.now(), LocalDateTime.now(), 33, 33);

    return trip;
  }

  public Scooter(long id, String tag, String status, String gpsLocation, int batteryCharge, int mileAge) {
    this.id = id;
    this.tag = tag;
    this.status = status;
    this.gpsLocation = gpsLocation;
    this.batteryCharger = batteryCharge;
    this.mileage = mileAge;
  }

  public Scooter() {

  }

  public static void setLastId(long lastId) {
    Scooter.lastId = lastId;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setTag(String tag) {
    this.tag = tag;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public void setGpsLocation(String gpsLocation) {
    this.gpsLocation = gpsLocation;
  }


  public int getBatteryCharger() {
    return batteryCharger;
  }

  public void setBatteryCharger(int batteryCharger) {
    this.batteryCharger = batteryCharger;
  }

  public void setMileage(int mileage) {
    this.mileage = mileage;
  }

  public int getMileage() {
    return mileage;
  }


  public static long getLastId() {
    return lastId;
  }

  public long getId() {
    return id;
  }

  public String getTag() {
    return tag;
  }

  public String getStatus() {
    return status;
  }

  public String getGpsLocation() {
    return gpsLocation;
  }


  public static Scooter createRandomScooter() {
    //id aanmaken

    long id = lastId++;

    //tag aanmaken
    Random r = new Random();
    String letters = "abcdefghijklmnopqrstuvwxyz";
    StringBuilder tagResult = new StringBuilder();
    final int N = 8;
    for (int i = 0; i < N; i++) {
      tagResult.append(letters.charAt(r.nextInt(letters.length())));
    }
    String tagResultFinal = tagResult.toString();

    //random status aanroepen
    double randomGetalEnum = Math.floor(Math.random() * 4) + 1;
    StringBuilder statusSb = new StringBuilder();

    if (randomGetalEnum < 2) {
      statusSb.append("INUSE");
    } else if (randomGetalEnum >= 2 && randomGetalEnum <= 3) {
      statusSb.append("IDLE");
    } else if (randomGetalEnum > 3) {
      statusSb.append("MAINTENANCE");
    }
    String statuss = statusSb.toString();

    //GPS locatie
    double longitudeGPS = 52379189;
    double eindeLong = Math.floor(Math.random() * 10);
    double longitude = longitudeGPS + eindeLong;

    double langitudeGPS = 4899431;
    double eindeLang = Math.floor(Math.random() * 10);
    double langitude = langitudeGPS + eindeLang;

    StringBuilder gpsLocatie = new StringBuilder();
    gpsLocatie.append(longitude + " " + langitude);
    String gps = gpsLocatie.toString();

    //batterij percentage pakken
    int batterijPercentage = (int) Math.floor(Math.random() * 100);
    int battery = batterijPercentage;
    if (batterijPercentage < 5) {
//   als het onder 5 is naar 5 maken;
      battery = 5;
    }
    // Aantal kilometers
    int distance = (int) Math.floor(Math.random() * 100);

    return new Scooter(lastId, tagResultFinal, statuss, gps, battery, distance);
  }


  public class sumAll {
  }


}
