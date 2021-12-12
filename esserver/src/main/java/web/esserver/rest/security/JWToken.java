
package web.esserver.rest.security;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import web.esserver.models.User;

import javax.crypto.spec.SecretKeySpec;
import javax.naming.AuthenticationException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JWToken {

  public static final String JWT_USERNAME_CLAIM = "sub";
  public static final String JWT_USERID_CLAIM = "id";
  public static final String JWT_ADMIN_CLAIM = "admin";

  private String username = null;
  private Long userId = 5l;
  private boolean admin = false;

  @Value("AA")
  private String issuer;

  @Value("Imagine being called Tobe just to be Tobe.")
  private String passphrase;

  @Value("1234")
  private int expiration;


  public JWToken() {

  }

  //Generate Token
  public String encode(User user) {
    Key key = getKey(passphrase);

    String token = Jwts.builder()
      .claim(JWT_USERNAME_CLAIM, user.getName())
      .claim(JWT_USERID_CLAIM, this.userId)
      .claim(JWT_ADMIN_CLAIM, this.admin)
      .setIssuer(issuer)
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
      .signWith(key, SignatureAlgorithm.HS256)
      .compact();

    return token;
  }

  private static Key getKey(String passPhrase) {
    byte hmacKey[] = passPhrase.getBytes(StandardCharsets.UTF_8);
    Key key = new SecretKeySpec(hmacKey, SignatureAlgorithm.HS256.getJcaName());
    return key;
  }

  public JWTokenData decode(String encodedToken) throws AuthenticationException {
    try {
      // Validatie van de tokens
      Key key = getKey(passphrase);
      Jws<Claims> jws = Jwts.parser().setSigningKey(key).parseClaimsJws(encodedToken);
      Claims claims = jws.getBody();

      JWTokenData jwToken = new JWTokenData();

      jwToken.setEmail(claims.get(Claims.SUBJECT).toString());

      String isAdminString = claims.get(JWT_ADMIN_CLAIM).toString();
      jwToken.setAdmin(Boolean.parseBoolean(isAdminString));

      return jwToken;

    } catch (ExpiredJwtException | MalformedJwtException |
      UnsupportedJwtException | IllegalArgumentException | SignatureException e) {
      throw new AuthenticationException(e.getMessage());
    }
  }

}
