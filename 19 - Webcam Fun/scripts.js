const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

const getVideo = () => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((mediaStream) => {
      video.srcObject = mediaStream;
      video.play();
    })
    .catch((err) => {
      console.error("You denied camera access!", err);
    });
};

const showOnCanvas = () => {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);

    //pixels = addRedFilter(pixels);

    pixels = splitColors(pixels);
    ctx.globalAlpha = 0.1;

    //pixels = addGreenScreen(pixels);

    ctx.putImageData(pixels, 0, 0);
  }, 16);
};

const takePhoto = () => {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "hefa");
  link.innerHTML = `<img src="${data}" alt="A girl boss" />`;
  strip.insertBefore(link, strip.firstChild);
};

const addRedFilter = (pixels) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 60;
    pixels.data[i + 1] = pixels.data[i + 1] - 70;
    pixels.data[i + 2] = pixels.data[i + 2] * 0.6;
  }
  return pixels;
};

const splitColors = (pixels) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0];
    pixels.data[i + 500] = pixels.data[i + 1];
    pixels.data[i - 550] = pixels.data[i + 2];
  }
  return pixels;
};

const addGreenScreen = (pixels) => {
  const levels = {};

  document.querySelectorAll(".rgb input").forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
};

getVideo();

video.addEventListener("canplay", showOnCanvas);
