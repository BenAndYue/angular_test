package web.esserver.models;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// this is a duplicate class of rest.protect and not quite the same
// remove this class and fix the protect class
//@Configuration // this one should not be configured
public class Helper implements WebMvcConfigurer {

  @Value("${jwt.issuer:MyOrganisation}")
  public String issuer;

  @Value("${jwt.pass-phrase: This is very secret information}")
  public String passphrase;

  @Value("${jwt.duration-of-validity:1200}")
  public int expiration;


  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
            //.allowedHeaders("GET", "POST", "PUT", "DELETE")
      .allowedMethods("GET", "POST", "PUT", "DELETE")
      .allowedOrigins("http://localhost:4200","https://localhost:8085" +
        "*" );
//    .allowedOrigins("*");
  }
}
