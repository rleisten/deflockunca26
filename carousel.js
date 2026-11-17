// Full-screen "More visualizations" carousel. Slides live in index.html (#carousel).
const root = document.getElementById("carousel");
const track = root.querySelector(".carousel-track");
const slides = [...root.querySelectorAll(".carousel-slide")];
const dotsWrap = root.querySelector(".carousel-dots");
const opener = document.getElementById("more-viz");
let index = 0;

const dots = slides.map((_, i) => {
  const d = document.createElement("button");
  d.type = "button";
  d.className = "carousel-dot";
  d.setAttribute("aria-label", `Go to visualization ${i + 1}`);
  d.onclick = () => go(i);
  dotsWrap.append(d);
  return d;
});

function go(i) {
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(${-index * 100}%)`;
  slides.forEach((s, n) => s.toggleAttribute("inert", n !== index));
  dots.forEach((d, n) => d.setAttribute("aria-current", String(n === index)));
}

function open() {
  root.hidden = false;
  document.body.style.overflow = "hidden";
  go(index);
  root.querySelector("[data-carousel-close]").focus();
}
function close() {
  root.hidden = true;
  document.body.style.overflow = "";
  opener.focus();
}

opener.onclick = open;
root.querySelector("[data-carousel-close]").onclick = close;
root.querySelector("[data-carousel-prev]").onclick = () => go(index - 1);
root.querySelector("[data-carousel-next]").onclick = () => go(index + 1);
document.addEventListener("keydown", (e) => {
  if (root.hidden) return;
  if (e.key === "Escape") close();
  else if (e.key === "ArrowLeft") go(index - 1);
  else if (e.key === "ArrowRight") go(index + 1);
});
