function goHome() {
    window.location.href = "index.html";
}

function openBooking() {
    document.getElementById("bookingModal").style.display = "flex";
}

function closeBooking() {
    document.getElementById("bookingModal").style.display = "none";
}

/* Scroll to top */
const scrollBtn = document.createElement("button");
scrollBtn.textContent = "↑";
scrollBtn.style.position = "fixed";
scrollBtn.style.bottom = "20px";
scrollBtn.style.right = "20px";
scrollBtn.style.padding = "10px";
scrollBtn.style.border = "none";
scrollBtn.style.borderRadius = "50%";
scrollBtn.style.cursor = "pointer";
scrollBtn.style.display = "none";
scrollBtn.style.background = "#0d6efd";
scrollBtn.style.color = "#fff";

document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* Booking functions */
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
