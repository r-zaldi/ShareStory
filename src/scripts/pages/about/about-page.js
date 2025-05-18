import AboutPresenter from "../../presenters/about-presenter.js";
import "../../../styles/about.css";

const AboutPage = {
  async render() {
    return `
      <div id="about-page">
        <section class="about-container">
          <header class="about-header">
            <h1>Selamat Datang di StoryShare</h1>
            <p>Tempat di mana setiap momen Anda menjadi kisah yang tak terlupakan.</p>
          </header>

          <div class="about-section">
            <h2>Visi & Misi</h2>
            <p><strong>Visi:</strong> Menjadi platform unggulan untuk berbagi cerita inspiratif dan berkesan di seluruh penjuru dunia.</p>
            <p><strong>Misi:</strong></p>
            <ul class="about-list">
              <li>Mendorong kreativitas melalui narasi visual dan teks.</li>
              <li>Menyediakan fitur canggih untuk mengambil foto, menandai lokasi, dan menulis deskripsi.</li>
              <li>Membangun komunitas yang saling menginspirasi dan mendukung.</li>
            </ul>
          </div>

          <div class="about-section">
            <h2>Fitur Unggulan</h2>
            <ul class="about-list">
              <li>Menampilkan daftar cerita menarik dari API</li>
              <li>Menambahkan cerita baru lengkap dengan foto dan lokasi</li>
              <li>Interaksi langsung dengan kamera dan peta</li>
              <li>Transisi halaman yang halus menggunakan View Transition API</li>
              <li>Ramah aksesibilitas dengan alt, label, dan skip link</li>
            </ul>
          </div>

          <div class="about-section">
            <h2>Teknologi yang Digunakan</h2>
            <ul class="about-list">
              <li>HTML5, CSS3, dan JavaScript ES6</li>
              <li>Leaflet.js untuk peta interaktif</li>
              <li>Webpack untuk proses bundling</li>
            </ul>
          </div>

          <div class="about-section">
            <h2>Developer</h2>
            <p>Achmad Rizaldi</p>
          </div>
        </section>
      </div>
    `;
  },

  async afterRender() {
    const container = document.getElementById("about-page");
    AboutPresenter.init(container);
  },
};

export default AboutPage;
