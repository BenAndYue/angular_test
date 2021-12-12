package web.esserver.rest.security;

class JWTokenData {
  public static final String KEY = "token";

  private boolean admin;
  private String email;

  public boolean isAdmin() {
    return admin;
  }

  public void setAdmin(boolean admin) {
    this.admin = admin;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}



