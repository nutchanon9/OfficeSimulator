import { Game } from '../game.js';


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

export function renderShop() {
    const locationDetails = document.getElementById('locationDetails');

    const shopItems = [
        { name: 'Intern', cost: 50, effect: () => (Game.internMultiplier += 1) },
        { name: 'New Laptop', cost: 100, effect: () => (Game.points += 10) },
    ];

    const shopDiv = document.createElement('div');
    shopItems.forEach((item) => {
        const button = document.createElement('button');
        button.innerText = `${item.name} (Cost: ${item.cost} Points)`;
        button.className = 'task-button';
        button.addEventListener('click', () => {
            if (Game.points >= item.cost) {
                Game.points -= item.cost;
                item.effect();
                Game.updateUI();
                console.log(`${item.name} purchased!`);
            } else {
                console.log('Not enough points!');
            }
        });
        shopDiv.appendChild(button);
    });

    locationDetails.appendChild(shopDiv);
}