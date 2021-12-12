package web.esserver;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import web.esserver.models.Scooter;
import web.esserver.models.Trip;
import web.esserver.repositories.RepoInterface;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;


@SpringBootApplication
public class EsserverApplication implements CommandLineRunner {

  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  RepoInterface<Scooter> scootersRepo;

  @Autowired
  RepoInterface<Trip> tripsRepo;

  public static void main(String[] args) {


    SpringApplication.run(EsserverApplication.class, args);

  }


  @Transactional
  @Override
  public void run(String... args) throws Exception {
    createInitialScooters();
    logger.info("All scooters ->{}", scootersRepo.findAll());


  }

  private void createInitialScooters() {

    List<Scooter> scooters = this.scootersRepo.findAll();

    if (scooters.size() > 0) return;
    System.out.println("some Scooter data");

    for (int i = 0; i < 8; i++) {
      Scooter scooter = Scooter.createRandomScooter();
      // save new scooter and remember the managed object with id set by EM
      scooter = this.scootersRepo.save(scooter);

      //scooter.addTrips(Scooter.startNewTrip(LocalDateTime.now()));
      //this.tripsRepo.save(scooter);

      Trip trip = Trip.createRandomTrip();
      // save new trip and remember the managed object with id set by EM
      trip = tripsRepo.save(trip);

      // associate trip with the scooter; EM-transaction will persist.
      scooter.addTrips(trip);



    }

  }

}


