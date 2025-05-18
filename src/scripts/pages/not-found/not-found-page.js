const NotFoundPage = {
  async render() {
    return `
        <section class="not-found">
          <h1>404 - Halaman Tidak Ditemukan</h1>
          <p>Maaf, halaman yang kamu cari tidak ada.</p>
          <p><a href="#/" class="home-link">Kembali ke Beranda</a></p>
        </section>
      `;
  },

  async afterRender() {
    const homeLink = document.querySelector(".home-link");
    homeLink.addEventListener("click", (event) => {
      event.preventDefault();
      
      document.body.classList.add("fade-out");
      setTimeout(() => {
        location.hash = "/";
      }, 300);
    });
  },
};

export default NotFoundPage;
