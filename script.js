const loveStory = {
  couple: "Mohamed & Gana",
  firstMeeting: "22 August 2026",
  engagementDay: "16 October 2026",
  music: "audio/37zK945N.mp3",
  photos: [
    {src:"images/WhatsApp%20Image%202026-11-05%20at%203.28.09%20PM.jpeg",caption:"The roses that made our beginning feel like a dream."},
    {src:"images/WhatsApp%20Image%202026-11-05%20at%203.28.05%20PM.jpeg",caption:"A little closer to forever."},
    {src:"images/WhatsApp%20Image%202026-11-05%20at%203.28.06%20PM.jpeg",caption:"Under the burgundy curtains, all smiles."},
    {src:"images/WhatsApp%20Image%202026-11-05%20at%203.28.06%20PM%20(1).jpeg",caption:"A night painted in celebration."},
    {src:"images/WhatsApp%20Image%202026-11-05%20at%203.28.07%20PM.jpeg",caption:"A keepsake for our forever."},
    {src:"images/WhatsApp%20Image%202026-11-05%20at%203.28.08%20PM.jpeg",caption:"A promise held close."},
    {src:"images/WhatsApp%20Image%202026-11-05%20at%203.28.10%20PM.jpeg",caption:"A reflection of our happiest day."},
    {src:"images/WhatsApp%20Image%202026-11-05%20at%203.28.10%20PM%20(1).jpeg",caption:"The two of us, surrounded by roses."},
    {src:"images/WhatsApp%20Image%202026-11-05%20at%203.28.11%20PM.jpeg",caption:"The first of so many beautiful photographs."},
    {src:"images/WhatsApp%20Image%202026-11-05%20at%203.28.12%20PM.jpeg",caption:"A quiet look that says everything."},
    {src:"images/WhatsApp%20Image%202026-11-05%20at%203.28.12%20PM%20(1).jpeg",caption:"Before the celebration, there was always us."},
    {src:"images/WhatsApp%20Image%202026-11-05%20at%203.28.12%20PM%20(2).jpeg",caption:"Flowers, soft smiles, and a beautiful future."}
  ]
};

const $ = (selector) => document.querySelector(selector);
const image = $("#slideImage");
const caption = $("#slideCaption");
const count = $("#slideCount");
const progress = $("#slideProgress");
const thumbs = $("#thumbStrip");
let activeSlide = 0;
let slideshowTimer;

function createRoses() {
  for (let index = 0; index < 22; index += 1) {
    const rose = document.createElement("span");
    rose.className = "floating-rose";
    rose.textContent = index % 4 === 0 ? "♥" : "✦";
    rose.style.cssText = "left:" + (Math.random() * 100) + "%;top:-" + (Math.random() * 95) + "vh;--duration:" + (10 + Math.random() * 12) + "s;--drift:" + (-110 + Math.random() * 220) + "px;animation-delay:-" + (Math.random() * 18) + "s";
    $("#floatingRoses").append(rose);
  }
}

function buildThumbnails() {
  loveStory.photos.forEach((photo, index) => {
    const button = document.createElement("button");
    button.className = "thumb";
    button.setAttribute("aria-label", "Open engagement photo " + (index + 1));
    button.innerHTML = '<img src="' + photo.src + '" alt="' + photo.caption + '" loading="lazy">';
    button.addEventListener("click", () => showSlide(index));
    thumbs.append(button);
  });
}

function showSlide(index) {
  activeSlide = (index + loveStory.photos.length) % loveStory.photos.length;
  image.classList.add("switching");
  window.setTimeout(() => {
    const photo = loveStory.photos[activeSlide];
    image.src = photo.src;
    image.alt = photo.caption;
    caption.textContent = photo.caption;
    count.textContent = String(activeSlide + 1).padStart(2, "0") + " / " + String(loveStory.photos.length).padStart(2, "0");
    progress.style.width = ((activeSlide + 1) / loveStory.photos.length) * 100 + "%";
    [...thumbs.children].forEach((thumb, thumbIndex) => thumb.classList.toggle("active", thumbIndex === activeSlide));
    thumbs.children[activeSlide].scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});
    image.classList.remove("switching");
  }, 250);
  resetSlideshow();
}

function resetSlideshow() {
  window.clearInterval(slideshowTimer);
  slideshowTimer = window.setInterval(() => showSlide(activeSlide + 1), 7000);
}

const music = $("#backgroundMusic");
const musicControl = $("#musicControl");
musicControl.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicControl.classList.add("playing");
      musicControl.setAttribute("aria-pressed", "true");
      musicControl.setAttribute("aria-label", "Pause background music");
      musicControl.querySelector("small").textContent = "Now playing";
    } catch {
      musicControl.querySelector("small").textContent = "Tap to play";
    }
  } else {
    music.pause();
    musicControl.classList.remove("playing");
    musicControl.setAttribute("aria-pressed", "false");
    musicControl.setAttribute("aria-label", "Play background music");
    musicControl.querySelector("small").textContent = "Tap to play";
  }
});

$("#previousSlide").addEventListener("click", () => showSlide(activeSlide - 1));
$("#nextSlide").addEventListener("click", () => showSlide(activeSlide + 1));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("show"); });
}, {threshold: 0.15});
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

createRoses();
buildThumbnails();
showSlide(0);
window.setTimeout(() => {
  $("#opening").classList.add("done");
  $("#site").classList.add("ready");
  $("#site").setAttribute("aria-hidden", "false");
}, 3300);
