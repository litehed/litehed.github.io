var ship = document.getElementById("ship");
var shipCoords = {
  x: ship.offsetLeft + (ship.clientWidth / 2),
  y: ship.offsetTop + (ship.clientHeight / 2)
};
var angle = 0;


document.onmousemove = function(event) {
    angle = Math.atan2(event.pageX - shipCoords.x, - (event.pageY - shipCoords.y) )*(180 / Math.PI);  
    ship.style.transform = "rotate(" + angle + "deg)";
}

document.onclick = function(event) {
    event.preventDefault();
    let laserAngle = angle;
    let laser = document.createElement("div");
    laser.classList.add("laser");
    laser.style.top = ship.offsetTop + ship.clientHeight/2 + "px";
    laser.style.left = ship.offsetLeft + ship.clientWidth/2 + "px";
    laser.style.transform = "rotate(" + laserAngle + "deg)";
    document.body.appendChild(laser);
    function animateLaser() {
    laser.style.top = laser.offsetTop - (Math.sin(laserAngle * (Math.PI / 180)) * 10) + "px";
    laser.style.left = laser.offsetLeft + (Math.cos(laserAngle * (Math.PI / 180)) * 10) + "px";
    if (laser.offsetLeft > window.innerWidth || laser.offsetTop < 2 || laser.offsetLeft < 2 || laser.offsetTop > window.innerHeight) {
        laser.remove();
    } else {
        requestAnimationFrame(animateLaser);
    }
    }
    animateLaser();
}
  
function createStar() {
    var star = document.createElement("div");
    star.classList.add("star");
    star.style.top = Math.floor(Math.random() * (100 - 0 + 1) + 0) + "%";
    star.style.left = Math.floor(Math.random() * (100 - 0 + 1) + 0) + "%";
    document.body.appendChild(star);
    
    function animateStar() {
        star.style.left = star.offsetLeft - 1 + "px";
        if (star.offsetLeft < -20) {
            star.remove();
        } else {
            requestAnimationFrame(animateStar);
        }
    }

    animateStar();
}

setInterval(createStar, 50);