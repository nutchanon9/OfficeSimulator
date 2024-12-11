import { renderShop } from './features/upgrades.js';

export const Game = {
    points: 0,
    prestigeLevel: 0,
    internMultiplier: 1,
    currentLocation: 'office', // Start at the office
    init() {
        console.log('Game initialized!');
        this.updateUI();
        this.renderLocationDetails();
    },
    moveTo(location) {
        this.currentLocation = location;
        console.log(`Moved to: ${location}`);
        this.renderLocationDetails();
    },
    renderLocationDetails() {
        const locationDetails = document.getElementById('locationDetails');
        locationDetails.innerHTML = ''; // Clear previous details

        switch (this.currentLocation) {
            case 'office':
                locationDetails.innerHTML = '<p>You are at the Office. Work hard!</p>';
                break;
            case 'shop':
                locationDetails.innerHTML = '<p>You are at the Shop. Buy upgrades!</p>';
                renderShop(); // Render shop items
                break;
            case 'park':
                locationDetails.innerHTML = '<p>You are at the Park. Relax and gain a small bonus.</p>';
                this.points += 5; // Small bonus for visiting the park
                this.updateUI();
                break;
            default:
                locationDetails.innerHTML = '<p>Unknown location.</p>';
        }
    },
    updateUI() {
        document.getElementById('points').innerText = this.points;
    },
};

Game.achievements = [
    { name: 'First Task', condition: () => Game.points >= 1, rewarded: false },
    { name: '100 Points Club', condition: () => Game.points >= 100, rewarded: false },
];

Game.checkAchievements = function () {
    this.achievements.forEach((achievement) => {
        if (achievement.condition() && !achievement.rewarded) {
            console.log(`Achievement Unlocked: ${achievement.name}`);
            achievement.rewarded = true;
        }
    });
};

Game.randomEvents = [
    { message: 'Printer Jammed! Lose 10 points.', effect: () => (Game.points -= 10) },
    { message: 'Boss Praised You! Gain 20 points.', effect: () => (Game.points += 20) },
];

Game.triggerRandomEvent = function () {
    const event = this.randomEvents[Math.floor(Math.random() * this.randomEvents.length)];
    console.log(event.message);
    event.effect();
    this.updateUI();
};

Game.moveTo = function (location) {
    const travelCost = 10; // Points required to travel
    const locationDetails = document.getElementById('locationDetails');
    locationDetails.style.opacity = 0; // Start animation
    setTimeout(() => {
        if (this.points >= travelCost) {
            this.points -= travelCost;
            this.currentLocation = location;
            console.log(`Moved to: ${location}`);
            this.renderLocationDetails();
            this.updateUI();
            locationDetails.style.opacity = 1; // End animation
        } else {
            console.log('Not enough points to travel!');
        }

    }, 500); // Animation delay
};