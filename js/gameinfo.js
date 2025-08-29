const API_KEY = "8b37f15057194b92b22b654f12914435";

// Get game ID from URL
const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");

document.getElementById("logo").onclick = function () {
  window.location.href = "index.html"
};

console.log("Game ID:", gameId);

const titleEl = document.querySelector(".game-title");
const descEl = document.querySelector(".game-description");
const ageEl = document.querySelector(".game-age");
const platformsEl = document.querySelector(".game-platforms");
const ratingEl = document.querySelector(".game-rating");
const screenshotsGrid = document.querySelector(".screenshots-grid");

async function loadGame() {
  if (!gameId) {
    titleEl.textContent = "Không tìm thấy game ID trong URL";
    return;
  }

  try {
    const res = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);
    const game = await res.json();
    console.log("Game details:", game);

    titleEl.textContent = game.name || "Không có tên";
    descEl.textContent = game.description_raw || "Không có mô tả.";
    ageEl.textContent = game.esrb_rating ? game.esrb_rating.name : "Không có thông tin";
    platformsEl.textContent = game.platforms
      ? game.platforms.map(p => p.platform.name).join(", ")
      : "Không có thông tin";
    ratingEl.textContent = `Rating: ${game.rating || "N/A"}`;

    const shotsRes = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${API_KEY}`);
    const shotsData = await shotsRes.json();
    console.log("Screenshots:", shotsData);

    if (shotsData.results && shotsData.results.length > 0) {
      screenshotsGrid.innerHTML = shotsData.results
        .map(shot => `<img src="${shot.image}" alt="Screenshot">`)
        .join("");
    } else {
      screenshotsGrid.innerHTML = "<p> Không có ảnh screenshot.</p>";
    }
  } catch (err) {
    console.error("Error:", err);
    screenshotsGrid.innerHTML = "<p> Lỗi khi tải dữ liệu.</p>";
  }
}

loadGame();

