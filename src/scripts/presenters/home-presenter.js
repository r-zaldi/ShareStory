// src/scripts/presenters/home-presenter.js
import { getAllStories } from "../data/api";
import Database from "../data/database";

export default class HomePresenter {
  constructor(view, mapHandler) {
    this.view = view;
    this.mapHandler = mapHandler;
  }

  async loadStories() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token tidak ditemukan.");

      const { listStory } = await getAllStories(token);
      const saved = await Database.getAllStories();
      const savedIds = new Set(saved.map((s) => s.id));

      this.view.displayStories(listStory, savedIds);
      this.mapHandler.addMarkers(listStory);
    } catch (err) {
      this.view.showError(err.message);
    }
  }

  async toggleBookmark(story) {
    const exists = await Database.getStory(story.id);
    if (exists) {
      await Database.removeStory(story.id);
    } else {
      await Database.putStory(story);
    }
    await this.loadStories();
  }
}
