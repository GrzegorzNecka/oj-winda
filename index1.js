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
    topEdge: e.offsetTop,
    bottomEdge: e.offsetTop + e.scrollHeight,
    elemHeight: e.scrollHeight,
    elemTitle: e.textContent.trim(),
    firstElemTitle: floors[0].innerText.trim(),
    lastElemTitle: floors[floors.length - 1].innerText.trim()
  };
};

/**
 * functions
 */

function setFloorName(currentScrollPos) {
  let result = "";

  floors.forEach(function(e) {
    const config = configFloor(e);

    if (
      currentScrollPos >= config.topEdge &&
      currentScrollPos <= config.bottomEdge
    ) {
      result = config.elemTitle;
    } else if (currentScrollPos < config.elemHeight) {
      result = config.firstElemTitle;
    } else if (currentScrollPos > elevator.scrollHeight - 250) {
      result = config.lastElemTitle;
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
