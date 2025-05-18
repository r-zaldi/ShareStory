// src/scripts/pages/home/home-page.js
import HomePresenter from "../../presenters/home-presenter.js";
import MapHandler    from "../../utils/map-handler.js";

const HomePage = {
  async render() {
    return `
      <h1>Daftar Story</h1>
      <section class="home">
        <div id="story-list" class="story-list"></div>
        <div id="map" style="height:400px; margin-top:60px"></div>
      </section>
    `;
  },

  async afterRender() {
    const mapHandler = new MapHandler("map");
    mapHandler.initMap();

    this.presenter = new HomePresenter(this, mapHandler);
    await this.presenter.loadStories();
  },

  displayStories(stories, savedIds) {
    const container = document.getElementById("story-list");
    container.innerHTML = stories
      .map((s) => {
        const isSaved = savedIds.has(s.id);
        return `
          <div class="story-card" data-id="${s.id}">
            <img src="${s.photoUrl}" alt="${s.name}">
            <h3>${s.name}</h3>
            <p><strong>Deskripsi:</strong> ${s.description}</p>
            <p><strong>Tanggal:</strong> ${new Date(s.createdAt).toLocaleDateString()}</p>
            <button class="btn bookmark-btn" data-id="${s.id}">
              ${isSaved ? "Hapus Story" : "Simpan Story"}
            </button>
          </div>
        `;
      })
      .join("");

    container.querySelectorAll(".bookmark-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const story = stories.find((st) => st.id === id);
        await this.presenter.toggleBookmark(story);
      });
    });
  },

  showError(msg) {
    document.getElementById("story-list").innerHTML =
      `<p class="error-message">${msg}</p>`;
  },
};

export default HomePage;
