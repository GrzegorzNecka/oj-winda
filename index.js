import "./style.css";

const directions = {
  top: "🔼",
  bottom: "🔽"
};

let currentScrollPos = 0;
let casheForsetFloorName = false;
const directionHtmlElem = document.querySelector(".direction");
const elevator = document.querySelector(".elevator");
const floors = document.querySelectorAll(".floor");

/**
 * functions
 */

function setFloorName(currentScrollPos) {
  let result = "";
  casheForsetFloorName = true;
  floors.forEach(function(floor) {
    if (currentScrollPos < floor.offsetTop) {
      if (casheForsetFloorName) {
        console.log(floor.textContent, floor.offsetTop);
        result = floor.textContent;
        casheForsetFloorName = false;
      }
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
