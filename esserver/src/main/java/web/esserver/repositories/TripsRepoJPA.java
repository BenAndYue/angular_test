package web.esserver.repositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import web.esserver.models.Scooter;
import web.esserver.models.Trip;
import web.esserver.repositories.exeptions.QueryException;
import web.esserver.repositories.exeptions.ResourceNotFoundExeption;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.security.sasl.SaslClient;
import javax.transaction.Status;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Repository
@Primary
public class TripsRepoJPA implements RepoInterface<Trip> {

  @PersistenceContext
  EntityManager sc;


  @Override
  public List<Trip> findAll() {
    TypedQuery<Trip> query = this.sc.createQuery("SELECT e FROM Trip e", Trip.class);

    return query.getResultList();

  }


  @Override
  public Trip findById(long id) {
    return this.sc.find(Trip.class, id);
  }

  @Override
  public Trip save(Trip trip) {
    if (trip.getId() == 0L) {
      this.sc.persist(trip);
      return trip;
    } else {
      return this.sc.merge(trip);
    }
  }

  @Override
  public List<Trip> findByQuery(String queryName, Object... params) {
   return null;
  }


  @Override
  public Boolean deleteById(long id) throws ResourceNotFoundExeption {
    Trip trip = findById(id);

    if (trip != null) {
      this.sc.remove(trip);
      return true;
    }
    return false;

  }

}


