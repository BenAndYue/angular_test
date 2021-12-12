package web.esserver.repositories.exeptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.EXPECTATION_FAILED)
public class ResourceNotFoundExeption extends RuntimeException {
  public ResourceNotFoundExeption(String berichht){
    super(berichht);
  }
}

