package web.esserver.rest;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import web.esserver.models.Scooter;
import web.esserver.models.Trip;
import web.esserver.repositories.RepoInterface;
import web.esserver.repositories.exeptions.QueryException;
import web.esserver.repositories.exeptions.ResourceNotFoundExeption;


import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("scooters")
public class ScooterController implements WebMvcConfigurer {

  @Autowired
  private RepoInterface<Scooter> scootRepo;

  //Test dit kan je verwijderen later en nu
  @CrossOrigin(origins = "http://localhost:4200")
  @GetMapping("/hello")
  public String getHello() {
    return "hallooo";
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**").allowedOrigins("http://localhost:4200", "http://localhost:8085");
  }

  //getAll methode voor het testen
  @GetMapping
  public List<Scooter> getAllScooters(@RequestParam(required = false) Integer battery, @RequestParam(required = false) String status) {

    int givenParamsCount = 0;

    if (battery != null) {
      givenParamsCount++;
    }

    if (status != null) {
      givenParamsCount++;
    }

    List<Scooter> scooters = null;

    if (givenParamsCount == 0) {
      scooters = this.scootRepo.findAll();
    } else if (givenParamsCount > 1) {
      throw new QueryException("Only one parameter please!");
    } else if (battery != null) {
      // Get offers by name
      scooters = this.scootRepo.findByQuery("Scooter-find_by_battery", battery);
    } else if (!status.equals("IDLE") &&
            !status.equals("INUSE") &&
            !status.equals("MAINTENANCE")) {
      throw new QueryException(status + " is not found");
    } else {
        // Get scooters by status
        scooters = this.scootRepo.findByQuery("Scooter-find_by_status", status);
    }

    return scooters;
  }


  @Autowired
  private RepoInterface<Trip> tripRepo;

  @GetMapping("/currenttrips")
  public List<Trip> getAllTrips() {
    String status = "INUSE";
    // Get offers by status
    List<Trip> trips = this.tripRepo.findByQuery("Trip_find_current_from_scooter", status);


    return trips;
  }


  //getId methode
  @GetMapping("/{id}")
  public Scooter getByid(@PathVariable long id) {
    return this.scootRepo.findById(id);
  }

  @PostMapping
  public ResponseEntity<Scooter> addScooter(@RequestBody Scooter scooter) {
    Scooter savedScooter = scootRepo.save(scooter);
    URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/{id}").buildAndExpand(savedScooter).toUri();
    return ResponseEntity.created(location).body(savedScooter);
  }

  //deleten
  @DeleteMapping("/{id}")
  public ResponseEntity<Scooter> removeScooter(@PathVariable long id) throws ResourceNotFoundExeption {
    scootRepo.deleteById(id);
//202 Accepted
    return ResponseEntity.accepted().build();
  }

  @GetMapping("/summary")
  @JsonView(Scooter.sumAll.class)
  public List<Scooter> getScooterSummarry() {
    return scootRepo.findAll();
  }

  //updaten
  @PutMapping("/{id}")
  public ResponseEntity<Scooter> updateScooter(@PathVariable long id, @RequestBody Scooter scooter) {
    Scooter sc = scootRepo.findById(id);
    if (sc == null) {
      throw new ResourceNotFoundExeption("Scooter met id = " + id + "\ndoes not match path parameter.  ");
    }
    if (sc != null) {
      sc.setTag(scooter.getTag());
      sc.setBatteryCharger(scooter.getBatteryCharger());
      sc.setGpsLocation(scooter.getGpsLocation());
      sc.setMileage(scooter.getMileage());
      sc.setStatus(scooter.getStatus());
    } else {
      scootRepo.save(scooter);

    }

    return ResponseEntity.ok(scooter);
  }


}
