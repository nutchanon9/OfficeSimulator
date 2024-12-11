import { Game } from './game.js';
import { initializeTasks } from './features/tasks.js';
import { addDailyBonus } from './features/dailyBonus.js';
import { initializePrestige } from './features/prestige.js';
import { switchDepartment } from './features/tasks.js';

document.addEventListener('DOMContentLoaded', () => {
    Game.init();
    initializeTasks();
    addDailyBonus();
    initializePrestige();
    // Handle map location clicks
    document.querySelectorAll('.map-location').forEach((locationButton) => {
        locationButton.addEventListener('click', () => {
            const location = locationButton.dataset.location;
            Game.moveTo(location);
        });
    });

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