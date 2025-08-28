const API_KEY = "8b37f15057194b92b22b654f12914435"; // 🔑 replace with your RAWG key
const BASE_URL = "https://api.rawg.io/api/games";

const PLATFORM_IDS = {
  "3ds": 8,
  "wiiu": 10
};

// prettier platform names for display
const PLATFORM_NAMES = {
  "3ds": "Nintendo 3DS",
  "wiiu": "Wii U"
};

async function fetchGames(query, platformKey) {
  try {
    const platformId = PLATFORM_IDS[platformKey];
    const url = `${BASE_URL}?search=${encodeURIComponent(query)}&platforms=${platformId}&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Error fetching games:", err);
    return [];
  }
}

function display(games, platformKey) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (games.length === 0) {
    results.innerHTML = "<p>Không tìm thấy trò chơi.</p>";
    return;
  }

  games.forEach(game => {
    const div = document.createElement("div");
    div.classList.add("game-card");
    div.innerHTML = `
      <h3>${game.name}</h3>
      <p><strong>Ngày phát hành:</strong> ${game.released || "Không rõ"}</p>
      <p><strong>Nền tảng:</strong> ${PLATFORM_NAMES[platformKey]}</p>
      <p><strong>Đánh giá:</strong> ${game.rating ? game.rating.toFixed(1) + "⭐" : "Chưa có"}</p>`;
    results.appendChild(div);
  });
}

// ✅ Prevent reload, allow Enter key
document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // stop reload
  const query = document.getElementById("searchInput").value.trim();
  const platformKey = document.getElementById("options").value;

  if (!query) return;

  const games = await fetchGames(query, platformKey);
  display(games, platformKey);
});
