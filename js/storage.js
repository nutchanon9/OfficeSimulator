export function saveGame(state) {
    localStorage.setItem('gameState', JSON.stringify(state));
}

export function loadGame() {
    const savedState = localStorage.getItem('gameState');
    return savedState ? JSON.parse(savedState) : null;
}
