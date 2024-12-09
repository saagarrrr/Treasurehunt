// Initialize Firestore
const db = firebase.firestore();

// Function to create a score row element
function createScoreRow(name, score) {
    return `
        <div class="score-row">
            <span class="name">${name}</span>
            <span class="score">${score}</span>
        </div>
    `;
}

// Function to add a new score
async function addScore(name, score) {
    try {
        await db.collection('scores').add({
            name: name,
            score: score,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        await loadLeaderboard(); // Refresh the leaderboard
    } catch (error) {
        console.error("Error adding score:", error);
    }
}

// Function to load and display scores
async function loadLeaderboard() {
    try {
        const scoresRef = db.collection('scores');
        const snapshot = await scoresRef.orderBy('score', 'desc').limit(8).get();
        
        const scoresContainer = document.getElementById('leaderboard-scores');
        scoresContainer.innerHTML = ''; // Clear existing scores

        snapshot.forEach(doc => {
            const data = doc.data();
            scoresContainer.innerHTML += createScoreRow(data.name, data.score);
        });
    } catch (error) {
        console.error("Error loading leaderboard:", error);
    }
}

// Load scores when page loads
document.addEventListener('DOMContentLoaded', loadLeaderboard);
