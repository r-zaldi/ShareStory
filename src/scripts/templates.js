export function generateAuthenticatedNavigationListTemplate() {
  return `
        <li><a href="#/">Beranda</a></li>
        <li><a href="#/about">About</a></li>
        <li><a href="#/add-story">Tambah Story</a></li>
        <li><a href="#/bookmark">Story Tersimpan</a></li>
        <li id="notification-list"></li>
        <li>
          <button id="logout-button">
            <i class="fas fa-sign-out-alt"></i>Logout
          </button>
        </li>
      `;
}

export function generateUnauthenticatedNavigationListTemplate() {
  return `
        <li><a href="#/login" id="login-button">Login</a></li>
        <li><a href="#/register" id="register-button">Register</a></li>
      `;
}

export function generateSubscribeButtonTemplate() {
  return `
    <button id="subscribe-button" class="btn subscribe-button">
      Subscribe <i class="fas fa-bell"></i>
    </button>
  `;
}

export function generateUnsubscribeButtonTemplate() {
  return `
    <button id="unsubscribe-button" class="btn unsubscribe-button">
      Unsubscribe <i class="fas fa-bell-slash"></i>
    </button>
  `;
}

export function generateReportsListEmptyTemplate() {
  return `<p class="empty-message">Tidak ada story tersimpan.</p>`;
}

export function generateReportsListErrorTemplate(message) {
  return `<p class="error-message">Gagal memuat data: ${message}</p>`;
}
