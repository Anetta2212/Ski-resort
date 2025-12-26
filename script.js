// ===== ELEMENTS =====
const resortList = document.getElementById("resortList");
const searchBtn = document.querySelector(".search-btn"); // виправлено
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
  { name: "Livigno", price: 2000, level: "intermediate", country: "Italy", image: "script/livigno.jpg" }
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
  const adults = Number(adultsSelect.value);
  const children = Number(childrenSelect.value);

  // Фільтруємо курорти (можна додати логіку по кількості людей пізніше)
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
      </div>
    `;

    resortList.appendChild(card);
  });
}
