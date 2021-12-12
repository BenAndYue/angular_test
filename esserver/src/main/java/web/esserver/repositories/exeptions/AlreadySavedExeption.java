package web.esserver.repositories.exeptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.ALREADY_REPORTED)
public class AlreadySavedExeption extends RuntimeException {
  public AlreadySavedExeption(String bericht) {
    super(bericht);
  }
}
