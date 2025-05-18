const CameraComponent = {
  stream: null,

  init() {
    const video = document.getElementById("camera");
    const openCameraButton = document.getElementById("open-camera");
    const closeCameraButton = document.getElementById("close-camera");
    const captureBtn = document.getElementById("capture-btn");
    const canvas = document.getElementById("canvas");
    const photoPreview = document.getElementById("photo-preview");
    const imageDataInput = document.getElementById("image-data");

    openCameraButton.addEventListener("click", async () => {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.srcObject = this.stream;
        video.style.display = "block";
      } catch (error) {
        alert("Gagal mengakses kamera: " + error.message);
      }
    });

    closeCameraButton.addEventListener("click", () => {
      this.stopCamera();
      video.style.display = "none";
    });

    captureBtn.addEventListener("click", () => {
      console.log("Tombol 'Ambil Foto' ditekan!");
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      photoPreview.src = imageData;
      imageDataInput.value = imageData;
      this.stopCamera();
      video.style.display = "none";
    });

    this.stopOnPageHide();
  },

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  },

  stopOnPageHide() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stopCamera();
      }
    });

    window.addEventListener("beforeunload", () => {
      this.stopCamera();
    });

    window.addEventListener("hashchange", () => {
      this.stopCamera();
    });
  },
};

export default CameraComponent;
