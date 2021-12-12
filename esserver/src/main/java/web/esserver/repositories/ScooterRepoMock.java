package web.esserver.repositories;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;
import web.esserver.models.Scooter;
import web.esserver.repositories.exeptions.ResourceNotFoundExeption;

import java.util.ArrayList;
import java.util.List;

//@Primary
@Repository
public class ScooterRepoMock implements RepoInterface<Scooter> {

  private List<Scooter> scooters = new ArrayList<>();

  @Override
  public List<Scooter> findAll() {
    return this.scooters;
  }

  @Override
  public Scooter findById(long id) {
    for (Scooter scooter : scooters) {
      if (scooter.getId() == id) {
        return scooter;
      }
    }
    return null;
  }

  @Override
  public Scooter save(Scooter scooter) {

    if (scooter.getId() == 0L){
      scooter.setId(scooters.size());
    }
    scooters.add(scooter);
    return scooter;
  }

  @Override
  public List<Scooter> findByQuery(String queryName, Object... params) {
    return null;
  }

  @Override
  public Boolean deleteById(long id) throws ResourceNotFoundExeption {

    if (!scooters.contains(findById(id))){
      throw new ResourceNotFoundExeption("Er is geen id gevonden. Dus er kan niks worden verwijderd");
    }
    scooters.removeIf(scooter -> scooter.getId() == id);
    return true;
  }


  public ScooterRepoMock() {
    scooters.add(new Scooter(1, "Eerste Scooter", "looc", "asdad", 12, 123));
    scooters.add(new Scooter(2, "Tweede Scooter", "yeg", "asdad", 14, 1234));
    scooters.add(new Scooter(3, "Derde Scooter", "gey", "asdad", 14, 1234));

    for (int i = 0; i < 7; i++) {
      scooters.add(Scooter.createRandomScooter());
    }
  }
  private void createInitialScooters(){
    List<Scooter> scooters = findAll();
    if (scooters!= null && scooters.size()>0){
      System.out.println("configuring some initial scooter data");
    }
    for (int i = 0; i < 7; i++) {
      Scooter scooter = Scooter.createRandomScooter();
      Scooter savedScooter = this.save(scooter);

    }

  }



}
