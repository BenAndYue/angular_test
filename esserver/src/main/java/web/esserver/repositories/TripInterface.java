package web.esserver.repositories;
import java.util.List;

public interface TripInterface<E> {

  List<E> findAll();

  E findById(long id);

  E save(E entity);

  List<E>findByQuery(String jpqlName);

  Boolean deleteById(long id);
}


