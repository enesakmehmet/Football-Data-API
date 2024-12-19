const apiKey = "YOUR_API_KEY";"51e7318f300d4d08a7f1f38368f0ad90" 
const apiUrl = "https://api.football-data.org/v2/matches";

async function fetchMatches() {
  try {
    const response = await fetch(apiUrl, {
      headers: { "X-Auth-Token": apiKey },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch matches");
    }

    const data = await response.json();
    displayMatches(data.matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    document.getElementById("match-container").innerHTML =
      "<p>Failed to load match data. Please try again later.</p>";
  }
}

function displayMatches(matches) {
  const container = document.getElementById("match-container");
  container.innerHTML = ""; // Clear previous data

  matches.forEach((match) => {
    const matchCard = document.createElement("div");
    matchCard.className = "match-card";

    const homeTeam = match.homeTeam.name;
    const awayTeam = match.awayTeam.name;
    const score =
      match.score.fullTime.homeTeam !== null
        ? `${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}`
        : "Not Started";

    matchCard.innerHTML = `
      <h3>${homeTeam} vs ${awayTeam}</h3>
      <p>Date: ${new Date(match.utcDate).toLocaleDateString()}</p>
      <p>Score: ${score}</p>
    `;

    container.appendChild(matchCard);
  });
}

// Fetch matches when the page loads
fetchMatches();
