export function updatePointsUI(points) {
    const pointsElement = document.getElementById('points');
    pointsElement.innerText = points;
}

export function addButtonToUI(containerId, label, onClick) {
    const container = document.getElementById(containerId);
    const button = document.createElement('button');
    button.innerText = label;
    button.addEventListener('click', onClick);
    container.appendChild(button);
}

export function showProgress(duration) {
    const progressBar = document.createElement('div');
    progressBar.style.width = '0%';
    progressBar.style.height = '20px';
    progressBar.style.backgroundColor = '#4CAF50';
    progressBar.style.transition = 'width 0.1s';

    const progressContainer = document.createElement('div');
    progressContainer.style.width = '100%';
    progressContainer.style.backgroundColor = '#ddd';
    progressContainer.appendChild(progressBar);

    document.body.appendChild(progressContainer);

    let progress = 0;
    const interval = setInterval(() => {
        progress += 100 / (duration / 100);
        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            progressContainer.remove();
        }
    }, 100);
}