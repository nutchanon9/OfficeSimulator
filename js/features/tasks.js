import { Game } from '../game.js';
import { showProgress } from '../ui.js';

export function initializeTasks() {
    Game.tasks = {
        General: [
            { name: 'File Report', points: 1 },
            { name: 'Send Email', points: 5 },
        ],
        HR: [
            { name: 'Review Resumes', points: 10 },
            { name: 'Conduct Interviews', points: 20 },
        ],
        IT: [
            { name: 'Fix Printer', points: 15 },
            { name: 'Upgrade Software', points: 25 },
        ],
    };
    Game.activeDepartment = 'General';
    renderTasks();
}

export function switchDepartment(department) {
    if (Game.tasks[department]) {
        Game.activeDepartment = department;
        renderTasks();
        console.log(`Switched to ${department} department`);
    }
}

function renderTasks() {
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = '';
    Game.tasks[Game.activeDepartment].forEach((task, index) => {
        const button = document.createElement('button');
        button.innerText = `${task.name} (${task.points} Points)`;
        button.addEventListener('click', () => {
            showProgress(2000); // 2 seconds
            Game.points += task.points * Game.internMultiplier;
            Game.updateUI();
        });
        tasksContainer.appendChild(button);
    });
}
