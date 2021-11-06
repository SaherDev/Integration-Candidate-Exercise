//check if the circles overlap
const isOverlap = (circle, rect) => {
  var distX = Math.abs(circle.x - rect.x - rect.width / 2);
  var distY = Math.abs(circle.y - rect.y - rect.height / 2);

  if (distX > rect.width / 2 + circle.r) {
    return false;
  }
  if (distY > rect.height / 2 + circle.r) {
    return false;
  }

  if (distX <= rect.width / 2) {
    return true;
  }
  if (distY <= rect.height / 2) {
    return true;
  }

  var dx = distX - rect.width / 2;
  var dy = distY - rect.height / 2;
  return dx * dx + dy * dy <= circle.r * circle.r;
};

//create circle (x, y, r)
const createCircle = (img, radius) => {
  const centerX = img.x + img.width / 2;
  const centerY = img.y + img.height / 2;
  return { x: centerX, y: centerY, r: radius };
};

//create new video elemnt
const createVideo = (width, height) => {
  var videoelement = document.createElement("video");
  videoelement.setAttribute("id", "my_video");
  var sourceMP4 = document.createElement("source");
  sourceMP4.type = "video/mp4";
  sourceMP4.src = `https://apv-static.minute.ly/videos/v-50bc6db9-a73b-49b1-966838-aa07-4f3bbace5851-s29.92-37.16m.mp4`;
  videoelement.appendChild(sourceMP4);
  videoelement.width = width;
  videoelement.height = height;
  return videoelement;
};

//replace image by options
const replaceStaticPictures = (option, radius) => {
  const images = document.querySelectorAll("img");

  let map = new Map();
  switch (option) {
    //option 1:
    case replacementOptions.PIXELS_DISTANCE:
      for (let i = 0; i < images.length; i++) {
        let inCircle = false;
        for (c of map.values()) {
          if (isOverlap(c, images[i])) {
            inCircle = true;
            break;
          }
        }
        if (!inCircle) {
          let circle = createCircle(images[i], radius);
          draw(circle);
          map.set(i, circle);
        }
      }

      for ([idx, val] of map) {
        let videoEl = createVideo(images[idx].width, images[idx].height);
        videoEl.play();
        videoEl.addEventListener("ended", function () {
          this.play();
        });
      
        // images[idx].style.display = "none";
        // images[idx].parentNode.appendChild(videoEl);
        images[idx].replaceWith(videoEl);
      }

      break;

    case replacementOptions.MOUSE_HOVER:
      //option 2
      for (let i = 0; i < images.length; i++) {
        images[i].addEventListener("mouseover", function () {
          let divCirc = document.querySelectorAll("#divCirc");
          for (c of divCirc) c.style.display = "none";
          let circle = createCircle(this, radius);
          circle.y += window.scrollY;
          draw(circle);

          let videoEl = createVideo(this.width, this.height);
          videoEl.addEventListener("mouseover", function () {
            this.play();
          });

          videoEl.addEventListener("mouseleave", function () {
            this.style.display = "none";
            this.parentNode.childNodes[0].style.display = "block";
            this.pause();
          });
          this.style.display = "none";
          this.parentNode.appendChild(videoEl);
        });
      }

      break;
  }

  let ob_images = document.getElementsByClassName("ob-image-ratio");
  for (let i = 0; i < ob_images.length; i++) {
    if (ob_images[i].nextElementSibling.tagName == "VIDEO")
      ob_images[i].style.paddingTop = "0";
  }
};

//draw circle outside the picture
const draw = (circle) => {
  var elemDiv = document.createElement("div");
  elemDiv.style.cssText = `
  left: ${circle.x}px;
  top: ${circle.y}px;
  box-shadow: 0 0 0 ${circle.r}px #ff97972f;
  outline: 2px solid red;
  outline-offset: ${circle.r}px;
  border-radius: 50%;
  width: 1px; 
  height: 1px;
  position:absolute;z-index:100`;
  elemDiv.id = "divCirc";
  document.body.prepend(elemDiv);
};

// replacement options
const replacementOptions = {
  MOUSE_HOVER: "MOUSE_HOVER",
  PIXELS_DISTANCE: "PIXELS_DISTANCE",
};

//option 1 : change by distance
//replaceStaticPictures(replacementOptions.PIXELS_DISTANCE, 600);

// option 2: change when mouse hover
//replaceStaticPictures(replacementOptions.MOUSE_HOVER, 400);
