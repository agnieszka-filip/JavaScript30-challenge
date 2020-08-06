const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

const togglePlay = () => {
  const method = video.paused ? "play" : "pause";
  video[method]();
};

function updateButton() {
  toggle.textContent = this.paused ? "►" : "❚ ❚";
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function updateRange() {
  video[this.name] = this.value;
}

video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
skipButtons.forEach((skipButton) => skipButton.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", updateRange));
ranges.forEach((range) => range.addEventListener("mousemove", updateRange));
