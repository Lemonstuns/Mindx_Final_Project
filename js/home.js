const API_KEY = "8b37f15057194b92b22b654f12914435"; // your RAWG key
const BASE_URL = "https://api.rawg.io/api/games";
const PLATFORM_IDS = {
  "3ds": 8,
  "wiiu": 10
};

async function fetchRecent() {
  const platformParams = `platforms=${PLATFORM_IDS["3ds"]},${PLATFORM_IDS["wiiu"]}`;
  const url = `${BASE_URL}?key=${API_KEY}&${platformParams}&ordering=-released&page_size=8`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Error fetching recent games:", err);
    return [];
  }
}

function renderRecent(games) {
  const container = document.getElementById("recentGames");
  container.innerHTML = games.map(game => {
    const date = game.released ? game.released : "Không rõ";
    const platformNames = (game.platforms || [])
      .map(p => p.platform.name)
      .filter(name => name === "Nintendo 3DS" || name === "Wii U")
      .join(", ");

    return `
      <div class="game-card">
        <h3>${game.name}</h3>
        <p class="meta"><strong>Phát hành:</strong> ${date}</p>
        <p class="meta"><strong>Nền tảng:</strong> ${platformNames}</p>
        <p class="meta"><strong>Rating:</strong> ${game.rating ? game.rating.toFixed(1) : "N/A"}</p>
      </div>
    `;
  }).join("");
}

window.addEventListener("load", async () => {
  const games = await fetchRecent();
  renderRecent(games);
});
