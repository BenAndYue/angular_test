package web.esserver.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonView;
import org.apache.tomcat.jni.Local;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity


//  inner join

public class Trip {


  public Trip() {
  }

  @Id
  @GeneratedValue
  @JsonView(Trip.sumAll.class)
  private long id;

  @JsonView(Trip.sumAll.class)
  private String beginTijd;

  public void setId(long id) {
    this.id = id;
  }

  public void setBeginTijd(String beginTijd) {
    this.beginTijd = beginTijd;
  }

  public void setEindPunt(LocalDateTime eindPunt) {
    this.eindPunt = eindPunt;
  }

  public void setMileage(double mileage) {
    this.mileage = mileage;
  }

  public void setCost(double cost) {
    this.cost = cost;
  }

  @JsonView(Trip.sumAll.class)
  @UpdateTimestamp
  private LocalDateTime eindPunt;

  @JsonView(Trip.sumAll.class)
  @UpdateTimestamp
  private LocalDateTime startPunt;


  @JsonView(Trip.sumAll.class)
  private double mileage;

  @JsonView(Trip.sumAll.class)
  private double cost;
  @ManyToOne
  @JsonView(Trip.sumAll.class)
  @JsonBackReference
  public Scooter scooter;


  public Trip(long id, String beginTijd, LocalDateTime eindPunt, LocalDateTime startPunt, double mileage, double cost) {
    this.id = id;
    this.beginTijd = beginTijd;
    this.eindPunt = eindPunt;
    this.startPunt = startPunt;
    this.mileage = mileage;
    this.cost = cost;
  }

  public Trip(String beginTijd, LocalDateTime eindPunt, LocalDateTime startPunt, double mileage, double cost) {
    this.beginTijd = beginTijd;
    this.eindPunt = eindPunt;
    this.startPunt = startPunt;
    this.mileage = mileage;
    this.cost = cost;
  }

  public void setStartPunt(LocalDateTime startPunt) {
    this.startPunt = startPunt;
  }


  public double getMileage() {
    return mileage;
  }


  public Scooter getScooter() {
    return scooter;
  }

  public void setScooter(Scooter scooter) {
    this.scooter = scooter;
  }

  public double getCost() {
    return cost;
  }

  public long getId() {
    return id;
  }

  public String getBeginTijd() {
    return beginTijd;
  }

  public LocalDateTime getEindPunt() {
    return eindPunt;
  }

  public LocalDateTime getStartPunt() {
    return startPunt;
  }




  public static Trip createRandomTrip() {
    Trip trip = new Trip(0, "3", LocalDateTime.now(), LocalDateTime.now(), 33, 22);
    return trip;
  }

  public class sumAll {
  }

}
