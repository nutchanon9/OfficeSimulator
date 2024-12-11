import { Game } from '../game.js';

export function initializeUpgrades() {
    Game.upgrades.push({
        name: 'Hire Intern',
        cost: 50,
        effect: () => (Game.internMultiplier += 1),
    });
    renderUpgrades();
}

function renderUpgrades() {
    const upgradesContainer = document.getElementById('upgrades');
    upgradesContainer.innerHTML = '';
    Game.upgrades.forEach((upgrade, index) => {
        const button = document.createElement('button');
        button.innerText = `${upgrade.name} (Cost: ${upgrade.cost} Points)`;
        button.addEventListener('click', () => {
            if (Game.points >= upgrade.cost) {
                Game.points -= upgrade.cost;
                upgrade.effect();
                Game.updateUI();
                renderUpgrades();
            }
        });
        upgradesContainer.appendChild(button);
    });
}
