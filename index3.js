import "./style.css";

const directions = {
  top: "🔼",
  bottom: "🔽"
};

let currentScrollPos = 0;

const directionHtmlElem = document.querySelector(".direction");
const elevator = document.querySelector(".elevator");
const floors = document.querySelectorAll(".floor");

const configFloor = floor => {
  return {
    floors: document.querySelectorAll(".floor"),
    topEdge: floor.offsetTop,
    bottomEdge: floor.offsetTop + floor.scrollHeight,
    height: floor.scrollHeight,
    title: floor.textContent.trim(),
    firstElemTitle() {
      return this.floors[0].innerText.trim();
    },
    lastElemTitle() {
      return this.floors[floors.length - 1].innerText.trim();
    },
    diffrenceElevatorAndFloorHeight() {
      return elevator.clientHeight - floor.clientHeight;
    }
  };
};

/**
 * functions
 */

function setFloorName(currentScrollPos) {
  let result = "";

  [...floors].forEach(function(floor) {
    const config = configFloor(floor);
    const scrollTop =
      currentScrollPos + config.diffrenceElevatorAndFloorHeight();

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
