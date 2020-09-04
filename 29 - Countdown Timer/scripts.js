let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time");

const timer = (seconds) => {
  clearInterval(countdown);
  const now = Date.now();
  const stopTime = now + seconds * 1000;
  displayTime(seconds);
  displayEndTime(stopTime);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((stopTime - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTime(secondsLeft);
  }, 1000);
};

const displayTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
};

const displayEndTime = (timestamp) => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
};

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));

document.customForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
