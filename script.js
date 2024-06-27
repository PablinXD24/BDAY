function updateTimer() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const diff = midnight - now;

    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    if (diff <= 0) {
        clearInterval(timerInterval);
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();

function createPixelizedTitle() {
    const titleElement = document.getElementById('animatedTitle');
    const titleText = "BRUNO BDAY";
    titleElement.innerHTML = '';
    
    for (let i = 0; i < titleText.length; i++) {
        const span = document.createElement('span');
        span.textContent = titleText[i];
        span.classList.add('pixel');
        span.style.setProperty('--i', i);
        titleElement.appendChild(span);
    }
}

function createConfetti(x, y) {
    const confettiColors = ['#f39c12', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71', '#f1c40f'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.setProperty('--x', `${Math.random() * 200 - 100}px`);
        confetti.style.setProperty('--y', `${Math.random() * 200 - 100}px`);
        confetti.style.setProperty('--color', confettiColors[Math.floor(Math.random() * confettiColors.length)]);
        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;
        document.body.appendChild(confetti);

        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
}

document.getElementById('animatedTitle').addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createConfetti(rect.left + x, rect.top + y);
    e.target.innerHTML = '';
    setTimeout(createPixelizedTitle, 2000); // Recreate title after 2 seconds
});

createPixelizedTitle();

document.getElementById('confirm-button').addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createConfetti(rect.left + x, rect.top + y);
    e.target.style.display = 'none';
    document.body.classList.add('party-mode');
    document.getElementById('party-info').style.display = 'block';
});

// Three.js 3D Object
function init3D() {
    const container = document.getElementById('3d-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();
}

init3D();
