package web.esserver.rest;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import web.esserver.models.User;
import web.esserver.rest.security.JWToken;

import javax.naming.AuthenticationException;

@RestController
@CrossOrigin
@RequestMapping("/authenticate")
public class AuthenticateController {

  @Autowired
  JWToken jwToken;


  @CrossOrigin(origins = "http://localhost:4200" )
  @PostMapping("/login")
  public ResponseEntity<User> authUser(@RequestBody ObjectNode sign) throws AuthenticationException {

    String password = sign.get("password").asText() ;
    String email = sign.get("email").asText();

    String[] emailNaam = email.split("@");

    if (emailNaam[0] == null || password == null) {
      throw new AuthenticationException("Er is geen email of passwoord ingevuld");
    } else {
      User user = new User();
      user.setId((long) (Math.random() * 100));

      user.setEmail(email);
      user.setHashedPassWord(password);
      user.setName(emailNaam[0]);
      if (emailNaam[0].equals(password)) {

        String tokenString = jwToken.encode(user);

        return ResponseEntity.accepted()
          .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenString)
          .body(user);

      } else throw new AuthenticationException("foute invoer voor passwoord en email");



    }

//    if (emailNaam[0].equals(password)) {
//      return ResponseEntity.accepted().header(HttpHeaders.AUTHORIZATION).body(user);
//    } else throw new AuthenticationException("foute invoer voor passwoord en email");


  }


//return ResponseEntity.accepted().body()
}





