const ship = document.getElementById("ship");
const starContainer = document.getElementById('stars');

const enemies = [
  {
    id: "enemy-github",
    link: "https://github.com/litehed"
  },
  {
    id: "enemy-linkedin",
    link: "https://www.linkedin.com/in/ethan-leitner-220965251/"
  }
];

enemies.forEach(enemy => {
  const enemyElement = document.getElementById(enemy.id);
  if (enemyElement) {
    enemy.element = enemyElement;
  } else {
    console.warn(`Enemy element with id "${enemy.id}" not found.`);
  }
});

var shipCoords = {
  x: ship.offsetLeft + (ship.clientWidth / 2),
  y: ship.offsetTop + (ship.clientHeight / 2)
};
var angle = 0;
var canShoot = true;

// Ship angle transform
document.onmousemove = function (event) {
  angle = Math.atan2(event.pageX - shipCoords.x, - (event.pageY - shipCoords.y)) * (180 / Math.PI);
  ship.style.transform = "rotate(" + angle + "deg)";
}

// Laser shot window.open("https://www.example.com", "_blank");
document.onclick = function (event) {
  if (!canShoot) return;
  event.preventDefault();
  let laserAngle = angle;
  let laser = document.createElement("div");
  laser.classList.add("laser");
  
  const laserSpeed = 10; // pixels per frame
  const radians = (laserAngle - 90) * (Math.PI / 180);
  const velocityX = Math.cos(radians) * laserSpeed;
  const velocityY = Math.sin(radians) * laserSpeed;
  
  let laserX = shipCoords.x + (ship.clientWidth / 2 * Math.cos(radians));
  let laserY = shipCoords.y + (ship.clientHeight / 2 * Math.sin(radians));
  
  laser.style.top = `${laserY}px`;
  laser.style.left = `${laserX}px`;
  laser.style.transform = `rotate(${laserAngle}deg)`;
  document.body.appendChild(laser);
  canShoot = false;
  setTimeout(function () {
    canShoot = true;
  }, 200);

  function animateLaser() {
    laserX += velocityX;
    laserY += velocityY;
    laser.style.left = `${laserX}px`;
    laser.style.top = `${laserY}px`;

    let laserRect = laser.getBoundingClientRect();

    for (const enemy of enemies) {
      if (enemy.element) {
        let enemyRect = enemy.element.getBoundingClientRect();
        const overlap = !(laserRect.right < enemyRect.left ||
          laserRect.left > enemyRect.right ||
          laserRect.bottom < enemyRect.top ||
          laserRect.top > enemyRect.bottom);

        if (overlap) {
          window.open(enemy.link, "_blank");
          laser.remove();
          return;
        }
      }
    }

    if (laserX > window.innerWidth || laserY < 0 || laserX < 0 || laserY > window.innerHeight) {
      laser.remove();
    } else {
      requestAnimationFrame(animateLaser);
    }
  }
  animateLaser();
}

// const img = document.getElementById("enemy-github")
// let y = 0;
// setInterval(() => {
//     img.style.top = y + 'px';
//     y += 1;
//     if(y === 10) y = 0;
// }, 10);

// Star generation and movement
const createStar = () => {
  const star = document.createElement("div");
  star.classList.add("star");

  // Randomly position the star
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;

  const size = Math.random() * 2 + 1; // 1-3 px
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  starContainer.appendChild(star);

  const startPosition = Math.random() * window.innerWidth;
  star.style.transform = `translateX(${startPosition}px)`;

  const animateStar = () => {
    const currentPosition = parseFloat(star.style.transform.match(/translateX\((.*?)px\)/)[1]);

    if (currentPosition < -20) {
      star.remove();
    } else {
      const newPosition = currentPosition - 1;
      star.style.transform = `translateX(${newPosition}px)`;
      requestAnimationFrame(animateStar);
    }
  };

  requestAnimationFrame(animateStar);
};

const createStarsInterval = setInterval(createStar, 90);

const stopCreatingStars = () => clearInterval(createStarsInterval);

// Initial Stars
const initialStarCount = 50;
for (let i = 0; i < initialStarCount; i++) {
  createStar();
}