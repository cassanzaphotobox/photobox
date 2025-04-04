document.addEventListener("DOMContentLoaded", () => { const video = document.getElementById("video"); const captureButton = document.getElementById("capture"); const canvas = document.getElementById("canvas"); const ctx = canvas.getContext("2d"); const downloadButton = document.getElementById("download"); const sizeSelector = document.getElementById("size-selector"); const applySizeButton = document.getElementById("apply-size");

// Mengakses kamera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error("Error accessing camera:", error);
    });

// Tangkap gambar
captureButton.addEventListener("click", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
});

// Terapkan filter
function applyFilter(filter) {
    canvas.style.filter = filter;
}

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function () {
        if (this.textContent.includes("Hitam Putih")) {
            applyFilter("grayscale(100%)");
        } else if (this.textContent.includes("Sepia")) {
            applyFilter("sepia(100%)");
        } else if (this.textContent.includes("Invert")) {
            applyFilter("invert(100%)");
        }
    });
});

// Ubah ukuran gambar
applySizeButton.addEventListener("click", () => {
    const size = sizeSelector.value;
    if (size === "small") {
        canvas.style.width = "200px";
    } else if (size === "medium") {
        canvas.style.width = "400px";
    } else if (size === "large") {
        canvas.style.width = "600px";
    }
});

// Unduh gambar
downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "photobox_image.png";
    link.href = canvas.toDataURL();
    link.click();
});

});

