package web.esserver.rest.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;
import web.esserver.repositories.exeptions.UnAuthorizedException;

import javax.naming.AuthenticationException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

@Configuration
@CrossOrigin(origins = "http://localhost:4200")
public class RequestFilter extends OncePerRequestFilter {

  @Autowired
  private JWToken jwToken;

  private static final Set<String> SECURED_PATHS =
    Set.of("/scooters","/bids","/users","/login");


  @Override
  @CrossOrigin(origins = "http://localhost:4200")
  protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {

    try {
      // get requested path
      String path = req.getServletPath();

      // OPTIONS requests and non-secured area should pass through without check
      if (HttpMethod.OPTIONS.matches(req.getMethod()) ||
        SECURED_PATHS.stream().noneMatch(path::startsWith)) {
        chain.doFilter(req, res);
        return;
      }



  // get the encoded token string from the authorization request header
      String encodedToken = req.getHeader(HttpHeaders.AUTHORIZATION);

      if (encodedToken == null) {
        // avoid giving clues to the caller (do not say that header is not present, for example)
        throw new AuthenticationException("You need to login first\n");

      }

      // remove the bearer initial string
      encodedToken = encodedToken.replace("Bearer ", "");


      // decode the token
       JWTokenData jwTokendata = jwToken.decode(encodedToken);


      req.setAttribute(jwTokendata.KEY, jwTokendata);

      if (jwToken == null) {

//        throw new UnAuthorizedException("You need to login first");
//        return statement voor testing
       return;
      }

      chain.doFilter(req, res);
    } catch (AuthenticationException e) {
      res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication error. JWT Signature can not been found on localy computer. Or there is no given Authorization key given");
      return;
    }

  }
}
