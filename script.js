// Initialize variables
let points = 0;
let internMultiplier = 1;

// Update points display
function updatePoints() {
    document.getElementById('points').innerText = points;
}

// Task button logic
document.getElementById('taskButton').addEventListener('click', () => {
    points += internMultiplier; // Earn points
    updatePoints();
});

// Upgrade button logic
document.getElementById('upgradeButton').addEventListener('click', () => {
    if (points >= 10) { // Check if enough points
        points -= 10; // Deduct cost
        internMultiplier += 1; // Increase multiplier
        updatePoints();
        alert('You hired an intern! Tasks are now more efficient!');
    } else {
        alert('Not enough points!');
    }
});

// Example Upgrade: Better Software
document.getElementById('softwareUpgradeButton').addEventListener('click', () => {
    if (points >= 50) {
        points -= 50;
        internMultiplier += 5; // Boost points
        updatePoints();
        alert('Upgraded to Better Software! Huge productivity boost!');
    } else {
        alert('Not enough points!');
    }
});

// Save progress
function saveProgress() {
    localStorage.setItem('points', points);
    localStorage.setItem('internMultiplier', internMultiplier);
}

// Load progress
function loadProgress() {
    points = parseInt(localStorage.getItem('points')) || 0;
    internMultiplier = parseInt(localStorage.getItem('internMultiplier')) || 1;
    updatePoints();
}

// Call loadProgress on page load
loadProgress();
window.addEventListener('beforeunload', saveProgress);

// Automate points generation
setInterval(() => {
    points += internMultiplier; // Earn points over time
    updatePoints();
}, 1000); // Every second
