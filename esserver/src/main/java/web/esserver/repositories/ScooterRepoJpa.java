package web.esserver.repositories;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;
import web.esserver.models.Scooter;
import web.esserver.repositories.exeptions.ResourceNotFoundExeption;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
@Primary
public class ScooterRepoJpa implements RepoInterface<Scooter> {
//  private List<Scooter> scooters = new ArrayList<>();


  @PersistenceContext
  EntityManager sc;


  @Override
  public List<Scooter> findAll() {
    TypedQuery<Scooter> query = this.sc.createQuery("SELECT e FROM Scooter e", Scooter.class);

    return query.getResultList();

  }


  @Override
  public Scooter findById(long id) {
    return this.sc.find(Scooter.class, id);
  }

  @Override
  public Scooter save(Scooter scooter) {
    if (scooter.getId() == 0L) {
      this.sc.persist(scooter);
      return scooter;
    } else {
      return this.sc.merge(scooter);
    }
  }

  @Override
  public List<Scooter> findByQuery(String queryName, Object... params) {

    TypedQuery<Scooter> namedQuery = sc.createNamedQuery(queryName, Scooter.class);
    namedQuery.setParameter(1, params[0]);
    return namedQuery.getResultList();

  }

  @Override
  public Boolean deleteById(long id) throws ResourceNotFoundExeption {
    Scooter scooter = findById(id);

    if (scooter != null) {
      this.sc.remove(scooter);
      return true;
    }
    return false;

  }

}
