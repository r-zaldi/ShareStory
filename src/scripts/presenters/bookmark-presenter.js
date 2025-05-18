import Database from "../data/database";

export default class BookmarkPresenter {
  constructor(view) {
    this.view = view;
  }

  async loadBookmarkedStories() {
    try {
      const stories = await Database.getAllStories();
      this.view.displayBookmarkedStories(stories);
    } catch {
      this.view.showError("Gagal memuat bookmark.");
    }
  }

  async deleteBookmarkedStory(id) {
    await Database.removeStory(id);
    this.view.showDeleteSuccess();
    await this.loadBookmarkedStories();
  }
}
