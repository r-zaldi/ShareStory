import LoginPresenter from "../../presenters/login-presenter";
import "../../../styles/auth.css";

export default class LoginPage {
  constructor() {
    this._showError = this.showError.bind(this);
    this.presenter = new LoginPresenter({
      showError: this._showError,
    });
  }

  async render() {
    return `
      <section class="form-page">
      <div id="loginError" class="error-message" style="display:none"></div>
        <form id="login-form" class="form-card">
          <h1>Login</h1>
          <label for="email">Email</label>
          <input id="email" name="email" type="text" placeholder="email@example.com" required />

          <label for="password">Password</label>
          <input id="password" name="password" type="password" placeholder="********" required />

          <button type="submit">Login</button>
          <p>Belum punya akun? <a href="#/register">Buat akun</a></p>
        </form>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      await this.presenter.handleLogin({ email, password });
    });
  }

  showError(message) {
    const errorElement = document.getElementById("loginError");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
      setTimeout(() => {
        errorElement.style.display = "none";
      }, 5000);
    }
  }
}
