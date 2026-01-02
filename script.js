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
  { name: "Bukovel", price: 900, level: "beginner", country: "Ukraine", image: "script/bukovel.jpg" },
  { name: "Zermatt", price: 3200, level: "advanced", country: "Switzerland", image: "script/zermatt.jpg" },
  { name: "Bansko", price: 1200, level: "beginner", country: "Bulgaria", image: "script/bansko.jpg" },
  { name: "Chamonix", price: 2800, level: "advanced", country: "France", image: "script/chamonix.jpg" },
  { name: "Zakopane", price: 800, level: "intermediate", country: "Poland", image: "script/zakopane.jpg" },
  { name: "Livigno", price: 2000, level: "intermediate", country: "Italy", image: "script/livigno.jpg" },
  { name: "Jasná", price: 1100, level: "intermediate", country: "Slovakia", image: "./images/jasna.jpg" },
  { name: "Sölden", price: 2600, level: "advanced", country: "Austria", image: "./images/solden.jpg" },
  { name: "Cortina d'Ampezzo", price: 3000, level: "advanced", country: "Italy", image: "./images/cortina.jpg" },
  { name: "Kranjska Gora", price: 1000, level: "beginner", country: "Slovenia", image: "./images/kranjska-gora.jpg" },
  { name: "Špindlerův Mlýn", price: 950, level: "intermediate", country: "Czech Republic", image: "./images/spindleruv-mlyn.jpg" },
  { name: "Poiana Brașov", price: 1050, level: "beginner", country: "Romania", image: "./images/poiana-brasov.jpg" }
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
}
