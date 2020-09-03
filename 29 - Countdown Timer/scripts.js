let countdown;

const timer = (seconds) => {
  const now = Date.now();
  const stopTime = now + sencons * 1000;

  countdown = setInterval(() => {
    const secondsLeft = Math.round((stopTime - Date.now()) / 1000);

    if (secondsLeft <= 0) {
      clearInterval(countdown);
      return;
    }
  }, 1000);
};
