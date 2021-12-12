package web.esserver.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class protect implements WebMvcConfigurer {

  @Value("${jwt.issuer:private Company}")
  public String issuer;

  @Value("${jwt.pass-phrase:This is very secret important information}")
  public String passphrase;

  @Value("${jwt.duration-of-validity:1200}")
  public int tokenDurationOfValidty;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
            // .allowedHeaders("GET", "POST", "PUT", "DELETE")
      .allowedMethods("GET", "POST", "PUT", "DELETE")
      .allowedOrigins("http://localhost:4200", "http://localhost:8081")
      .exposedHeaders("Authorization");
 //     .allowedOrigins("*");
  }
}
