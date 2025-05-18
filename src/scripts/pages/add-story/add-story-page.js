import CameraComponent from "../../components/camera-component.js";
import MapComponent from "../../components/map-component.js";
import AddStoryPresenter from "../../presenters/add-story-presenter.js";
import "../../../styles/add-story.css";

const AddStoryPage = {
  async render() {
    return `
      <h1 class="page-title">Tambah Story</h1>

      <section class="add-story-section">
        <form id="add-story-form">
          <section class="card camera-card">
            <h2 class="card-title">Ambil Foto</h2>
            <div class="camera-wrapper">
              <video id="camera" autoplay muted playsinline class="camera-view" style="display:none;"></video>
              <div class="button-group">
                <button type="button" id="open-camera" class="btn btn-camera">Buka Kamera</button>
                <button type="button" id="close-camera" class="btn btn-camera">Tutup Kamera</button>
                <button type="button" id="capture-btn" class="btn btn-camera">Ambil Foto</button>
              </div>
            </div>
            <canvas id="canvas" style="display:none;"></canvas>
            <img id="photo-preview" class="preview-img" alt="Hasil Foto"/>
            <input type="hidden" id="image-data" />
          </section>

          <section class="card map-card">
            <h2 class="card-title">Pilih Lokasi</h2>
            <div id="map" class="map-view"></div>
            <div class="coords">
              <div class="coord-field">
                <label for="latitude">Latitude</label>
                <input type="text" id="latitude" readonly />
              </div>
              <div class="coord-field">
                <label for="longitude">Longitude</label>
                <input type="text" id="longitude" readonly />
              </div>
            </div>
          </section>

          <section class="card desc-card">
            <label for="description" class="card-title desc">Deskripsi</label>
            <textarea id="description" placeholder="Tulis deskripsi di sini..." class="desc-input"></textarea>
          </section>

          <section class="card desc-card">
            <button type="submit" id="submit-btn" class="btn btn-primary btn-block">Tambah Story</button>
          </section>
        </form>
      </section>
    `;
  },
  async afterRender() {
    CameraComponent.init();
    MapComponent.init();

    const submitButton = document.getElementById("submit-btn");
    submitButton.addEventListener("click", async (event) => {
      event.preventDefault();

      const imageData = document.getElementById("image-data").value;
      const latitude = document.getElementById("latitude").value;
      const longitude = document.getElementById("longitude").value;
      const description = document.getElementById("description").value;

      await AddStoryPresenter.addStory({
        imageData,
        latitude,
        longitude,
        description,
      });
    });

    window.addEventListener("beforeunload", () => {
      CameraComponent.stopCamera();
    });
  },
};

export default AddStoryPage;
