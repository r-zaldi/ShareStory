// src/scripts/pages/bookmark/bookmark-page.js
import BookmarkPresenter from "../../presenters/bookmark-presenter.js";
import { generateReportsListEmptyTemplate } from "../../templates.js";

const BookmarkPage = {
  async render() {
    return `
      <section class="bookmark">
        <h1>Daftar Story Tersimpan</h1>
        <div class="container">
            <div id="story-list" class="story-list"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    this.presenter = new BookmarkPresenter(this);
    await this.presenter.loadBookmarkedStories();
  },

  displayBookmarkedStories(stories) {
    const container = document.getElementById("story-list");
    if (!stories.length) {
      container.innerHTML = generateReportsListEmptyTemplate();
      return;
    }
    container.innerHTML = stories
      .map(
        (s) => `
        <div class="story-card" data-id="${s.id}">
          <img src="${s.photoUrl}" alt="${s.name}">
          <h3>${s.name}</h3>
          <p><strong>Deskripsi:</strong> ${s.description}</p>
          <p><strong>Tanggal:</strong> ${new Date(
            s.createdAt
          ).toLocaleDateString()}</p>
          <button class="btn delete-story-btn" data-id="${s.id}">
            Hapus Story
          </button>
        </div>`
      )
      .join("");

    container
      .querySelectorAll(".delete-story-btn")
      .forEach((btn) =>
        btn.addEventListener("click", () =>
          this.presenter.deleteBookmarkedStory(btn.dataset.id)
        )
      );
  },

  showDeleteSuccess() {
    alert("Story berhasil dihapus dari bookmark.");
  },
  showError(msg) {
    document.getElementById(
      "story-list"
    ).innerHTML = `<p class="error-message">${msg}</p>`;
  },
};

export default BookmarkPage;
