import { Game } from '../game.js';

export function addDailyBonus() {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('lastLogin');
    if (lastLogin !== today) {
        Game.points += 50;
        localStorage.setItem('lastLogin', today);
        Game.updateUI();
        console.log('Daily Bonus! +50 Points');
    }
}
