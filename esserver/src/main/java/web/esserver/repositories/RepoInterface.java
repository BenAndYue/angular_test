package web.esserver.repositories;

import web.esserver.models.Scooter;
import web.esserver.repositories.exeptions.ResourceNotFoundExeption;

import java.util.List;

public interface RepoInterface<E> {
  List<E> findAll();

  E findById(long id);

  E save(E entity);

  List<E> findByQuery(String queryName, Object... params);

  Boolean deleteById(long id)
    throws ResourceNotFoundExeption;
}
