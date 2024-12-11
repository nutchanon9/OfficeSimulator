export const Game = {
    points: 0,
    prestigeLevel: 0,
    internMultiplier: 1,
    tasks: [],
    upgrades: [],
    init() {
        console.log('Game initialized!');
        this.updateUI();
    },
    updateUI() {
        document.getElementById('points').innerText = this.points;
        document.getElementById('prestige').innerText = `Prestige Level: ${this.prestigeLevel}`;
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

