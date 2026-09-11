const header = document.querySelector(".site-header");
const menuBtn = document.querySelector(".menu-btn");
const mobilePanel = document.querySelector(".mobile-panel");
const modal = document.querySelector("#quote-modal");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = lightbox?.querySelector("img");

window.addEventListener("scroll", () => {
  const pastHero = window.scrollY > window.innerHeight * 0.72;
  header.classList.toggle("solid", pastHero);
});

menuBtn?.addEventListener("click", () => {
  mobilePanel.classList.toggle("open");
});

document.querySelectorAll("[data-open-quote]").forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    modal.classList.add("open");
    mobilePanel?.classList.remove("open");
  });
});

document.querySelectorAll("[data-close-modal]").forEach((el) => {
  el.addEventListener("click", () => modal.classList.remove("open"));
});

modal?.addEventListener("click", (event) => {
  if (event.target === modal) modal.classList.remove("open");
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    item.classList.toggle("open");
    const mark = button.querySelector("span");
    if (mark) mark.textContent = item.classList.contains("open") ? "−" : "+";
  });
});

document.querySelectorAll("[data-jump-filter]").forEach((link) => {
  link.addEventListener("click", () => {
    const value = link.dataset.jumpFilter;
    const match = document.querySelector(`.filter[data-filter="${value}"]`);
    match?.click();
  });
});

const filters = document.querySelectorAll(".filter");
const figures = document.querySelectorAll(".gallery-grid figure");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    const value = filter.dataset.filter;
    figures.forEach((figure) => {
      const show = value === "all" || figure.dataset.category === value;
      figure.style.display = show ? "" : "none";
    });
  });
});

figures.forEach((figure) => {
  figure.addEventListener("click", () => {
    const img = figure.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
  });
});

lightbox?.addEventListener("click", () => lightbox.classList.remove("open"));

function fillTicker() {
  const track = document.querySelector(".ticker-track");
  const seed = track?.querySelector(".ticker-group");
  if (!track || !seed) return;

  const cities = [
    "Austin, TX",
    "Round Rock",
    "Cedar Park",
    "Georgetown",
    "San Marcos",
    "Leander",
    "Pflugerville",
    "University of Texas",
    "Kyle",
    "Hutto",
  ];

  const makeGroup = () => {
    const group = document.createElement("div");
    group.className = "ticker-group";
    group.innerHTML = cities.map((city) => `<span>${city}</span>`).join("");
    return group;
  };

  track.innerHTML = "";
  const first = makeGroup();
  track.appendChild(first);

  const minWidth = Math.max(document.documentElement.clientWidth, 1400);
  while (first.offsetWidth < minWidth) {
    cities.forEach((city) => {
      const span = document.createElement("span");
      span.textContent = city;
      first.appendChild(span);
    });
  }

  for (let i = 0; i < 3; i += 1) {
    track.appendChild(first.cloneNode(true));
  }
}

fillTicker();
window.addEventListener("resize", fillTicker);

const form = document.querySelector("#quote-form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = document.querySelector("#form-success");
  note.hidden = false;
  form.reset();
});
