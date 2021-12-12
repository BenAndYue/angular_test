package web.esserver.models;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {

  @JsonView(web.esserver.models.User.sumAll.class)
  @GeneratedValue
  @Id
  private long id;
  @JsonView(web.esserver.models.User.sumAll.class)
  private String name;

  @JsonView(web.esserver.models.User.sumAll.class)
  private String email;
  private String hashedPassWord;

  @JsonView(web.esserver.models.Scooter.sumAll.class)
  private Boolean admin = false;

  public User() {

  }

  public class sumAll {
  }

  public User(long id, String name, String email, String hashedPassWord, Boolean admin) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.hashedPassWord = hashedPassWord;
    this.admin = admin;
  }

  public String getName() {
    return name;
  }

  public String getEmail() {
    return email;
  }

  public String getHashedPassWord() {
    return hashedPassWord;
  }

  public Boolean getAdmin() {
    return admin;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setHashedPassWord(String hashedPassWord) {
    this.hashedPassWord = hashedPassWord;
  }

  public void setAdmin(Boolean admin) {
    this.admin = admin;
  }

  public long getId() {
    return id;
  }

  @Override
  public String toString() {
    return "User{" +
      "id=" + id +
      ", name='" + name + '\'' +
      ", email='" + email + '\'' +
      ", hashedPassWord='" + hashedPassWord + '\'' +
      ", admin=" + admin +
      '}';
  }
}
