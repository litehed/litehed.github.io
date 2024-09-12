const ship = document.getElementById("ship");
const starContainer = document.getElementById('stars');
const githubEnemy = document.getElementById("enemy-github");

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
  laser.style.top = shipCoords.y + (ship.clientHeight / 2 * Math.sin((laserAngle - 90) * (Math.PI / 180))) + "px";
  laser.style.left = shipCoords.x + (ship.clientWidth / 2 * Math.cos((laserAngle - 90) * (Math.PI / 180))) + "px";
  laser.style.transform = "rotate(" + laserAngle + "deg)";
  document.body.appendChild(laser);
  canShoot = false;
  setTimeout(function () {
    canShoot = true;
  }, 200);
  function animateLaser() {
    let laserRect = laser.getBoundingClientRect();
    let githubRect = githubEnemy.getBoundingClientRect();

    var overlap = !(laserRect.right < githubRect.left ||
      laserRect.left > githubRect.right ||
      laserRect.bottom < githubRect.top ||
      laserRect.top > githubRect.bottom)

    laser.style.top = laser.offsetTop + (Math.sin((laserAngle - 90) * (Math.PI / 180)) * 10) + "px";
    laser.style.left = laser.offsetLeft + (Math.cos((laserAngle - 90) * (Math.PI / 180)) * 10) + "px";
    if (overlap) {
      window.open("https://github.com/litehed", "_blank");
      laser.remove()
      return;
    }
    if (laser.offsetLeft > window.innerWidth || laser.offsetTop < 2 || laser.offsetLeft < 2 || laser.offsetTop > window.innerHeight) {
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