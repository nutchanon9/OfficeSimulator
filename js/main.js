import { Game } from './game.js';
import { initializeTasks } from './features/tasks.js';
import { initializeUpgrades } from './features/upgrades.js';
import { addDailyBonus } from './features/dailyBonus.js';
import { initializePrestige } from './features/prestige.js';
import { switchDepartment } from './features/tasks.js';

document.addEventListener('DOMContentLoaded', () => {
    Game.init();
    initializeTasks();
    initializeUpgrades();
    addDailyBonus();
    initializePrestige();

    setInterval(() => {
        Game.checkAchievements();
    }, 1000); // Check achievements every second
});

document.getElementById('departmentSelect').addEventListener('change', (e) => {
    switchDepartment(e.target.value);
});

setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every 10 seconds
        Game.triggerRandomEvent();
    }
}, 10000);