// ===== ELEMENTS =====
const resortList = document.getElementById("resortList");
const searchBtn = document.querySelector(".search-btn");
const budgetRange = document.getElementById("budgetRange");
const budgetValue = document.getElementById("budgetValue");
const countrySelect = document.getElementById("countrySelect");
const adultsSelect = document.getElementById("adultsSelect");
const childrenSelect = document.getElementById("childrenSelect");

// ===== DATA =====
const resorts = [
  {
    name: "Bukovel",
    price: 900,
    level: "beginner",
    country: "Ukraine",
    image: "script/bukovel.jpg",
    skiRuns: 75,
    chairlifts: 17,
    nightSkiing: true,
    equipmentRental: true,
    snowParks: true,
    difficultyMix: { beginner: 40, intermediate: 45, advanced: 15 }
  },
  {
    name: "Zermatt",
    price: 3200,
    level: "advanced",
    country: "Switzerland",
    image: "script/zermatt.jpg",
    skiRuns: 200,
    chairlifts: 32,
    nightSkiing: false,
    equipmentRental: true,
    snowParks: true,
    difficultyMix: { beginner: 20, intermediate: 50, advanced: 30 }
  },
  {
    name: "Bansko",
    price: 1200,
    level: "beginner",
    country: "Bulgaria",
    image: "script/bansko.jpg",
    skiRuns: 70,
    chairlifts: 14,
    nightSkiing: true,
    equipmentRental: true,
    snowParks: false,
    difficultyMix: { beginner: 35, intermediate: 50, advanced: 15 }
  },
  {
    name: "Chamonix",
    price: 2800,
    level: "advanced",
    country: "France",
    image: "script/chamonix.jpg",
    skiRuns: 170,
    chairlifts: 27,
    nightSkiing: false,
    equipmentRental: true,
    snowParks: true,
    difficultyMix: { beginner: 15, intermediate: 45, advanced: 40 }
  },
  {
    name: "Zakopane",
    price: 800,
    level: "intermediate",
    country: "Poland",
    image: "script/zakopane.jpg",
    skiRuns: 50,
    chairlifts: 12,
    nightSkiing: true,
    equipmentRental: true,
    snowParks: false,
    difficultyMix: { beginner: 45, intermediate: 40, advanced: 15 }
  },
  {
    name: "Livigno",
    price: 2000,
    level: "intermediate",
    country: "Italy",
    image: "script/livigno.jpg",
    skiRuns: 115,
    chairlifts: 31,
    nightSkiing: true,
    equipmentRental: true,
    snowParks: true,
    difficultyMix: { beginner: 30, intermediate: 50, advanced: 20 }
  },
  {
    name: "Jasná",
    price: 1100,
    level: "intermediate",
    country: "Slovakia",
    image: "script/jasna.jpg",
    skiRuns: 50,
    chairlifts: 18,
    nightSkiing: true,
    equipmentRental: true,
    snowParks: true,
    difficultyMix: { beginner: 35, intermediate: 45, advanced: 20 }
  },
  {
    name: "Sölden",
    price: 2600,
    level: "advanced",
    country: "Austria",
    image: "script/solden.jpg",
    skiRuns: 144,
    chairlifts: 31,
    nightSkiing: false,
    equipmentRental: true,
    snowParks: true,
    difficultyMix: { beginner: 20, intermediate: 50, advanced: 30 }
  },
  {
    name: "Cortina d'Ampezzo",
    price: 3000,
    level: "advanced",
    country: "Italy",
    image: "script/cortina.jpg",
    skiRuns: 120,
    chairlifts: 36,
    nightSkiing: false,
    equipmentRental: true,
    snowParks: false,
    difficultyMix: { beginner: 25, intermediate: 55, advanced: 20 }
  },
  {
    name: "Kranjska Gora",
    price: 1000,
    level: "beginner",
    country: "Slovenia",
    image: "script/kranjska-gora.jpg",
    skiRuns: 20,
    chairlifts: 6,
    nightSkiing: true,
    equipmentRental: true,
    snowParks: false,
    difficultyMix: { beginner: 60, intermediate: 30, advanced: 10 }
  },
  {
    name: "Špindlerův Mlýn",
    price: 950,
    level: "intermediate",
    country: "Czech Republic",
    image: "script/spindleruv-mlyn.jpg",
    skiRuns: 27,
    chairlifts: 11,
    nightSkiing: true,
    equipmentRental: true,
    snowParks: true,
    difficultyMix: { beginner: 40, intermediate: 45, advanced: 15 }
  },
  {
    name: "Poiana Brașov",
    price: 1050,
    level: "beginner",
    country: "Romania",
    image: "script/poiana-brasov.jpg",
    skiRuns: 24,
    chairlifts: 9,
    nightSkiing: true,
    equipmentRental: true,
    snowParks: false,
    difficultyMix: { beginner: 50, intermediate: 40, advanced: 10 }
  }
];


// ===== INIT =====
renderResorts(resorts);
budgetValue.textContent = budgetRange.value;

// ===== EVENTS =====
budgetRange.addEventListener("input", () => {
  budgetValue.textContent = budgetRange.value;
});

searchBtn.addEventListener("click", () => {
  const selectedLevels = [...document.querySelectorAll(
    'input[type="checkbox"][value]:checked'
  )].map(cb => cb.value);

  const maxBudget = Number(budgetRange.value);
  const selectedCountry = countrySelect.value;

  const filteredResorts = resorts.filter(resort => {
    const matchesBudget = resort.price <= maxBudget;
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(resort.level);
    const matchesCountry = selectedCountry === "" || resort.country === selectedCountry;
    return matchesBudget && matchesLevel && matchesCountry;
  });

  renderResorts(filteredResorts);
});

// ===== FUNCTIONS =====
function renderResorts(list) {
  resortList.innerHTML = "";

  if (list.length === 0) {
    resortList.innerHTML = `
      <p style="opacity:0.7; text-align:center;">
        No resorts found
      </p>
    `;
    return;
  }

  list.forEach(resort => {
    const card = document.createElement("div");
    card.className = "resort-card";

    card.innerHTML = `
      <div class="resort-image">
        <img src="${resort.image}" alt="${resort.name}" />
      </div>
      <div class="resort-info">
        <h4>${resort.name}</h4>
        <p>from €${resort.price.toLocaleString()}</p>
        <small>${resort.country} · ${resort.level}</small>
        <br><br>
        <button class="btn-primary" onclick="openResort('${resort.name}')">View resort</button>
      </div>
    `;

    resortList.appendChild(card);
  });
}

// ===== OPEN RESORT PAGE =====
function openResort(name) {
  if (name === "Bukovel") {
    window.location.href = "bukovel.html";
  }

  if (name === "Zermatt") {
    window.location.href = "zermatt.html";
  }

  if (name === "Bansko") {
    window.location.href = "bansko.html";
  }

  if (name === "Chamonix") {
    window.location.href = "chamonix.html";
  }

  if (name === "Zakopane") {
    window.location.href = "zakopane.html";
  }
}



function openBooking(resortName = null) {
  document.getElementById("bookingCenter").style.display = "flex";

  if (resortName) {
    document.getElementById("resortSelect").value = resortName;
  }

  calculatePrice();
}

function closeBookingCenter() {
  document.getElementById("bookingCenter").style.display = "none";
}

function calculatePrice() {
  const type = document.getElementById("passType").value;
  const days = Number(document.getElementById("days").value);

  let base = 50;

  if (type === "vip") base = 90;
  if (type === "family") base = 120;

  const total = base * days;
  document.getElementById("totalPrice").textContent = total + " €";
}

document.addEventListener("input", calculatePrice);

function confirmBooking() {
  const resort = document.getElementById("resortSelect").value;
  const days = document.getElementById("days").value;
  const type = document.getElementById("passType").value;

  alert(
    `Your ski pass for ${resort} has been reserved!\n` +
    `Type: ${type}\n` +
    `Days: ${days}\n` +
    `See you on the slopes ❄️⛷️`
  );

  closeBookingCenter();
}


// ===== карусель фото =====
const track = document.querySelector('.hero-gallery__track');
const slides = Array.from(document.querySelectorAll('.hero-slide'));
const btnPrev = document.querySelector('.hero-gallery__arrow--left');
const btnNext = document.querySelector('.hero-gallery__arrow--right');
const dotsContainer = document.querySelector('.hero-gallery__dots');
const dots = Array.from(document.querySelectorAll('.hero-dot'));

let currentIndex = 0;

function updateGallery(index) {
  currentIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle('hero-slide--active', i === currentIndex);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('hero-dot--active', i === currentIndex);
  });

  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

btnNext.addEventListener('click', () => {
  updateGallery(currentIndex + 1);
});

btnPrev.addEventListener('click', () => {
  updateGallery(currentIndex - 1);
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => updateGallery(i));
});

// Автоплей (можеш прибрати, якщо не треба)
let autoplay = setInterval(() => {
  updateGallery(currentIndex + 1);
}, 6000);

track.addEventListener('mouseenter', () => clearInterval(autoplay));
track.addEventListener('mouseleave', () => {
  autoplay = setInterval(() => {
    updateGallery(currentIndex + 1);
  }, 6000);
});

updateGallery(0);

