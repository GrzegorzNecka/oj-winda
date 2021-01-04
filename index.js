import "./style.css";

const directions = {
  top: "🔼",
  bottom: "🔽"
};

let currentScrollPos = 0;

const directionHtmlElem = document.querySelector(".direction");
const elevator = document.querySelector(".elevator");
const floors = document.querySelectorAll(".floor");

const configFloor = e => {
  return {
    floors: document.querySelectorAll(".floor"),
    topEdge: e.offsetTop,
    bottomEdge: e.offsetTop + e.scrollHeight,
    height: e.scrollHeight,
    title: e.textContent.trim(),
    firstElemTitle() {
      return this.floors[0].innerText.trim();
    },
    lastElemTitle() {
      return this.floors[floors.length - 1].innerText.trim();
    }
  };
};

/**
 * functions
 */

function setFloorName(currentScrollPos) {
  let result = "";

  [...document.querySelectorAll(".floor")].forEach(function(floor) {
    const config = configFloor(floor);

    let diffrenceElevatorAndFloorHeight =
      elevator.clientHeight - floor.clientHeight;
    let scrollTop = currentScrollPos + diffrenceElevatorAndFloorHeight;

    if (scrollTop >= config.topEdge && scrollTop <= config.bottomEdge) {
      result = config.title;
    } else if (scrollTop < config.height) {
      result = config.firstElemTitle();
    } else if (scrollTop > elevator.scrollHeight - 250) {
      result = config.lastElemTitle();
    }
  });

  return result;
}

function setDirection(prevScrollPos, currentScrollPos) {
  const title = setFloorName(currentScrollPos);

  if (prevScrollPos < currentScrollPos) {
    directionHtmlElem.innerText = `Kierunek: ${directions.bottom} / ${title}`;
  } else if (prevScrollPos > currentScrollPos) {
    directionHtmlElem.innerText = `Kierunek: ${directions.top} / ${title}`;
  }
}

/**
 * Event
 */

elevator.addEventListener("scroll", e => {
  let prevScrollPos = currentScrollPos;
  currentScrollPos = Math.round(e.target.scrollTop);

  setTimeout(function() {
    setDirection(prevScrollPos, currentScrollPos);
  }, 200);
});
