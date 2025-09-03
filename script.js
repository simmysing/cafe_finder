// Mock cafe data with details
const cafes = [
  { name: "Brew Haven", rating: 4, cuisine: "Bakery & Coffee", location: "Downtown", price: "$$", hours: "Open now", img: "https://picsum.photos/seed/cafe1/250/150" },
  { name: "Mocha Magic", rating: 5, cuisine: "Desserts & Coffee", location: "Uptown", price: "$$", hours: "Closes at 9 PM", img: "https://picsum.photos/seed/cafe2/250/150" },
  { name: "Latte Lounge", rating: 3, cuisine: "Cafe & Snacks", location: "City Center", price: "$", hours: "Closed", img: "https://picsum.photos/seed/cafe3/250/150" },
  { name: "Espresso Express", rating: 4, cuisine: "Espresso Bar", location: "West End", price: "$$", hours: "Open now", img: "https://picsum.photos/seed/cafe4/250/150" }
];

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const favoritesBtn = document.getElementById("favoritesBtn");
const favoritesSection = document.getElementById("favorites");
const favoritesList = document.getElementById("favoritesList");
const toast = document.getElementById("toast");

let savedCafes = [];

// Render search results
function renderCafes(list, container, showHeart = true) {
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML = `<p class="empty">😢 No cafes found here</p>`;
    return;
  }
  list.forEach(cafe => {
    const card = document.createElement("div");
    card.classList.add("card", "animate__animated", "animate__fadeInUp");

    card.innerHTML = `
      <img src="${cafe.img}" alt="${cafe.name}">
      ${showHeart ? `<span class="heart-btn">❤</span>` : ""}
      <h3>${cafe.name}</h3>
      <div class="stars">${"⭐".repeat(cafe.rating)}</div>
      <p><strong>Cuisine:</strong> ${cafe.cuisine}</p>
      <p><strong>Location:</strong> ${cafe.location}</p>
      <p><strong>Price:</strong> ${cafe.price}</p>
      <p><strong>Hours:</strong> ${cafe.hours}</p>
    `;

    if (showHeart) {
      const heartBtn = card.querySelector(".heart-btn");
      heartBtn.addEventListener("click", () => {
        const saved = savedCafes.find(c => c.name === cafe.name);
        if (!saved) {
          savedCafes.push(cafe);
          heartBtn.classList.add("saved");
          showToast("✅ Cafe saved!");
        } else {
          savedCafes = savedCafes.filter(c => c.name !== cafe.name);
          heartBtn.classList.remove("saved");
          showToast("❌ Cafe removed!");
        }
      });
    }

    container.appendChild(card);
  });
}

// Render favorites as scrapbook list
function renderFavorites(list) {
  favoritesList.innerHTML = "";
  if (list.length === 0) {
    favoritesList.innerHTML = `<p class="empty">💔 No saved cafes yet</p>`;
    return;
  }
  const favContainer = document.createElement("div");
  favContainer.classList.add("favorites-list");

  list.forEach(cafe => {
    const item = document.createElement("div");
    item.classList.add("favorite-item", "animate__animated", "animate__fadeInLeft");

    item.innerHTML = `
      <img src="${cafe.img}" alt="${cafe.name}">
      <div class="favorite-info">
        <h4>${cafe.name}</h4>
        <p>⭐ ${cafe.rating} | ${cafe.cuisine}</p>
        <p>${cafe.location} • ${cafe.price} • ${cafe.hours}</p>
      </div>
      <button class="delete-btn">🗑️</button>
    `;

    // Delete favorite with fadeOut animation
    const deleteBtn = item.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      item.classList.remove("animate__fadeInLeft");
      item.classList.add("animate__fadeOutRight");

      setTimeout(() => {
        savedCafes = savedCafes.filter(c => c.name !== cafe.name);
        renderFavorites(savedCafes);
        showToast("🗑️ Cafe removed from favorites");
      }, 500); // wait for animation
    });

    favContainer.appendChild(item);
  });

  favoritesList.appendChild(favContainer);
}

// Search event
searchBtn.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (!city) return;
  renderCafes(cafes, results);
});

// Favorites toggle
favoritesBtn.addEventListener("click", () => {
  favoritesSection.classList.toggle("hidden");
  renderFavorites(savedCafes);
});

// Toast
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
