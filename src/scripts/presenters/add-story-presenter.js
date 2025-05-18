import { addStory } from "../data/api";

const AddStoryPresenter = {
  async addStory({ imageData, latitude, longitude, description }) {
    console.log("🔍 Data yang dikirim:", {
      imageData,
      latitude,
      longitude,
      description,
    });

    if (!imageData || !latitude || !longitude || !description) {
      alert("⚠ Harap lengkapi semua data!");
      return;
    }

    try {
      const response = await addStory({
        photo: imageData,
        lat: latitude,
        lon: longitude,
        description: description,
      });

      console.log("🔴 Response dari API:", response);

      if (response.error) {
        alert("❌ Gagal menambahkan story!");
      } else {
        alert("✅ Story berhasil ditambahkan!");
        window.location.hash = "#/"; // Redirect to homepage
      }
    } catch (error) {
      alert("❌ Terjadi kesalahan: " + error.message);
    }
  },
};

export default AddStoryPresenter;
