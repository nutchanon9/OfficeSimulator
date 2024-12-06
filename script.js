// Initialize variables
let points = 0;
let internMultiplier = 1;
let level = 1;
let pointsToNextLevel = 50; // Points required to level up

// Player setup logic
document.getElementById("startGame").addEventListener("click", () => {
    const name = document.getElementById("playerName").value;
    const role = document.getElementById("playerRole").value;

    if (name.trim() === "") {
        alert("Please enter a name!");
        return;
    }

    // Save player data
    localStorage.setItem("playerName", name);
    localStorage.setItem("playerRole", role);

    // Show greeting and hide setup
    const greeting = document.getElementById("greeting");
    greeting.innerText = `Welcome, ${name} the ${role}!`;
    greeting.classList.remove("hidden");

    document.getElementById("playerSetup").remove();
});

// Load player data on page reload
document.addEventListener("DOMContentLoaded", () => {
    const name = localStorage.getItem("playerName");
    const role = localStorage.getItem("playerRole");

    if (name && role) {
        const greeting = document.getElementById("greeting");
        greeting.innerText = `Welcome back, ${name} the ${role}!`;
        greeting.classList.remove("hidden");
        document.getElementById("playerSetup").remove();
    }
});

function checkLevelUp() {
    if (points >= pointsToNextLevel) {
        level += 1;
        points -= pointsToNextLevel;
        pointsToNextLevel += 500; // Increase threshold for next level
        updatePoints();
        document.getElementById('level').innerText = level;
        alert(`Congratulations! You've reached Level ${level}!`);
    }
}

function logTask(taskName) {
    const log = document.getElementById('taskLog');
    const logItem = document.createElement('li');
    logItem.innerText = `${taskName} completed at ${new Date().toLocaleTimeString()}`;
    logItem.className = "text-sm text-gray-700 mb-1";

    log.prepend(logItem); // Add new log item to the top
}

// Call checkLevelUp after every task
document.getElementById('taskButton').addEventListener('click', () => {
    points += internMultiplier;
    updatePoints();
    checkLevelUp();
});

function startProgressBar(duration) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = '0%';

    let progress = 0;
    const interval = setInterval(() => {
        progress += 100 / (duration / 100); // Increment width
        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 100);
}
// Update points display
function updatePoints() {
    const pointsElement = document.getElementById('points');
    pointsElement.innerText = points;

    // Add animation class
    pointsElement.classList.add('animate-bounce');
    setTimeout(() => pointsElement.classList.remove('animate-bounce'), 300);
}

// Call this when a task starts
document.getElementById('taskButton').addEventListener('click', () => {
    startProgressBar(2000); // 2 seconds
    points += internMultiplier;
    updatePoints();
    checkLevelUp();
    logTask("Filed a report");
});
// Email Task
document.getElementById('emailTask').addEventListener('click', () => {
    points += 2; // Add points for sending emails
    updatePoints();
});

// Meeting Task (with cooldown)
let meetingCooldown = false;
document.getElementById('meetingTask').addEventListener('click', () => {
    if (!meetingCooldown) {
        points += 5;
        updatePoints();
        meetingCooldown = true;
        alert('You attended a meeting! 5 points earned.');

        // Cooldown reset
        setTimeout(() => {
            meetingCooldown = false;
        }, 5000); // 5-second cooldown
    } else {
        alert('Meeting in progress. Please wait!');
    }
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

document.getElementById('buyCoffee').addEventListener('click', () => {
    if (points >= 20) {
        points -= 20;
        internMultiplier += 1; // Boost productivity
        updatePoints();
        alert('You bought coffee! Feeling energized!');
    } else {
        alert('Not enough points!');
    }
});

document.getElementById('buyChair').addEventListener('click', () => {
    if (points >= 50) {
        points -= 50;
        alert('You bought an ergonomic chair! Work faster now!');
    } else {
        alert('Not enough points!');
    }
});


function randomEvent() {
    const events = [
        { message: "Printer jammed! Lose 5 points.", effect: () => (points -= 5) },
        { message: "Boss praised you! Gain 10 points.", effect: () => (points += 10) },
        { message: "Coffee spill! Work halted for 5 seconds.", effect: () => (internMultiplier = 0) },
    ];

    const random = Math.floor(Math.random() * events.length);
    alert(events[random].message);
    events[random].effect();

    // Reset internMultiplier if affected
    if (internMultiplier === 0) {
        setTimeout(() => {
            internMultiplier = 1; // Reset after 5 seconds
        }, 5000);
    }

    updatePoints();
}

// Trigger a random event every 30 seconds
setInterval(randomEvent, 30000);
