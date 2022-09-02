var move = setInterval(movement, 100)
var snake = document.getElementById("move");
var fruit = document.getElementById("fruit")
var box = document.getElementById("box")
var trail = document.getElementsByClassName("snake")
var colors = ["red", "blue", "magenta", "purple", "orange"]
var direction = "Left"
var memmory = []
var timer = 0;
var score = 0;
var blockWidth = 24;
var width = Math.min(Math.ceil(window.innerWidth / blockWidth) * blockWidth - 24, 960);
var height = Math.min(Math.ceil(window.innerHeight / blockWidth) * blockWidth, 480);
if (window.innerWidth < 767) {
    box.style.width = width + "px"
    height = 360;
    box.style.height = "360px"
}
// document.getElementById("up").onclick=keydown
document.body.addEventListener('keydown', function (event) {
    const key = event.key;
    switch (key) {
        case "ArrowLeft":
            if (direction !== "right" && trail.length > 0) {
                direction = "left"
            }
            break;
        case "ArrowRight":
            if (direction !== "left" && trail.length > 0) {
                direction = "right"
            }
            break;
        case "ArrowUp":
            if (direction !== "down" && trail.length > 0) {
                direction = "up"
            }
            break;
        case "ArrowDown":
            if (direction !== "up" && trail.length > 0) {
                direction = "down"
            }
            break;
    }
});

function handleKey(key){
    switch (key) {
        case "left":
            if (direction !== "right" && trail.length > 0) {
                direction = "left"
            }
            break;
        case "right":
            if (direction !== "left" && trail.length > 0) {
                direction = "right"
            }
            break;
        case "up":
            if (direction !== "down" && trail.length > 0) {
                direction = "up"
            }
            break;
        case "down":
            if (direction !== "up" && trail.length > 0) {
                direction = "down"
            }
            break;
    }
}

function setPath() {
    for (var i = 1; i < trail.length; i++) {
        trail[i].style.left = memmory[i][0] + "px"
        trail[i].style.top = memmory[i][1] + "px"
        if (snake.offsetTop === trail[i].offsetTop && snake.offsetLeft === trail[i].offsetLeft) {
            clearInterval(move)
            snake.style.animation = "blink 0.2s infinite"
            setTimeout(restart, 5000)
            snake.style.zIndex = "100"
        }
    }
}

function movement() {
    timer += 0.1;
    if (direction === "right") {
        snake.style.left = snake.offsetLeft + blockWidth + "px"
        if (snake.offsetLeft > width - blockWidth) {
            snake.style.left = 0
        }
    } else if (direction === "down") {
        snake.style.top = snake.offsetTop + blockWidth + "px"
        if (snake.offsetTop > height - blockWidth) {
            snake.style.top = 0
        }
    } else if (direction === "left") {
        snake.style.left = snake.offsetLeft - blockWidth + "px"
        if (snake.offsetLeft < 0) {
            snake.style.left = width - blockWidth + "px"
        }
    } else {
        snake.style.top = snake.offsetTop - blockWidth + "px"
        if (snake.offsetTop < 0) {
            snake.style.top = height - blockWidth + "px"
        }
    }
    populate(0, 0);
    setPath()
    if ((snake.offsetLeft === fruit.offsetLeft && snake.offsetTop === fruit.offsetTop) || timer % 10 === 0) {
        // alert(timer)
        fruit.style.top = Math.floor(Math.random() * (box.offsetHeight - blockWidth) / blockWidth) * blockWidth + "px";
        fruit.style.left = Math.floor(Math.random() * (box.offsetWidth - blockWidth) / blockWidth) * blockWidth + "px";
        // fruit.style.background=colors[Math.floor(Math.random()*5)]
        score += 5;
        document.getElementById("score").innerHTML = "score : " + score;
        expand()
    }

}

function populate(x, y) {
    memmory.unshift([snake.offsetLeft + x, snake.offsetTop + y])

}

function expand() {
    var box = document.getElementById("box")
    var exp = document.createElement("div");
    exp.classList.add("snake")
    exp.style.background = " radial-gradient(#e2b714, #c59a00)"
    box.appendChild(exp);
}

function restart() {
    location.reload();
}