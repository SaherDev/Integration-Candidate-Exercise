let videoEl = document.querySelector(".vjs-tech");

videoEl.addEventListener("abort", () => {
  console.log("Video load is aborted.");
});

videoEl.addEventListener("play", () => {
  console.log("Video is played.");
});

videoEl.addEventListener("pause", () => {
  console.log("Video is paused.");
});

videoEl.addEventListener("durationchange", () => {
  console.log("Video duration has changed.");
});

videoEl.addEventListener("error", () => {
  console.log("Something went wrong!");
});

videoEl.addEventListener("ratechange", () => {
  console.log("Playing speed of video is changed.");
});

videoEl.addEventListener("seeked", () => {
  console.log("Video is jumped.");
});

videoEl.addEventListener("volumechange", () => {
  if (videoEl.muted === true) {
    console.log("Volume is muted.");
  } else {
    console.log("Volume is changed.");
  }
});

videoEl.addEventListener("webkitfullscreenchange", () => {
  console.log("Video is on full screen now.");
});

let fsBtn = document.querySelector(".vjs-fullscreen-control");

fsBtn.addEventListener("click", () => {
  console.log("Full screen is changed now.");
});
