// Fake data: cafes in different cities
const cafes = {
  "new york": ["Cafe Grumpy", "Birch Coffee", "Think Coffee"],
  "los angeles": ["Intelligentsia", "Blue Bottle", "Verve Coffee"],
  "chicago": ["Dark Matter Coffee", "Metric Coffee", "Sip of Hope"],
  "san francisco": ["Ritual Coffee", "Philz Coffee", "Sightglass Coffee"]
};

// Get elements
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");

// Add event listener for the button
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.toLowerCase();
  resultsDiv.innerHTML = ""; // clear old results

  if (cafes[city]) {
    resultsDiv.innerHTML = `<h2>Cafes in ${city.charAt(0).toUpperCase() + city.slice(1)}:</h2>`;
    const list = document.createElement("ul");
    cafes[city].forEach(cafe => {
      const li = document.createElement("li");
      li.textContent = cafe;
      list.appendChild(li);
    });
    resultsDiv.appendChild(list);
  } else {
    resultsDiv.innerHTML = "<p>Sorry, no cafes found for that city.</p>";
  }
});
