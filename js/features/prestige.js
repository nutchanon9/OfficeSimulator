import { Game } from '../game.js';

export function initializePrestige() {
    document.getElementById('prestigeButton').addEventListener('click', () => {
        if (Game.points >= 1000) {
            Game.prestigeLevel += 1;
            Game.points = 0;
            Game.internMultiplier += Game.prestigeLevel;
            console.log(`Prestige achieved! Level: ${Game.prestigeLevel}`);
            Game.updateUI();
        } else {
            console.log('Not enough points to prestige!');
        }
    });
}
