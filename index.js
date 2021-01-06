import "./style.css";

const directions = {
  top: "🔼",
  bottom: "🔽"
};

let currentScrollPos = 0;
let casheOfTitleFloor = false;
const directionHtmlElem = document.querySelector(".direction");
const elevator = document.querySelector(".elevator");
const floors = document.querySelectorAll(".floor");

function setFloorTitle(currentScrollPos) {
  let result = "";
  casheOfTitleFloor = true;

  for (let i = 0; i < floors.length; i++) {
   const floor = floors[i];

    


    if (
      currentScrollPos - floor.clientHeight <= floor.offsetTop &&
      casheOfTitleFloor
    ) {
      result = floor.textContent.trim();
      casheOfTitleFloor = false;
    } else if (
      currentScrollPos >= elevator.scrollHeight - elevator.clientHeight &&
      casheOfTitleFloor
    ) {
      result = floors[floors.length - 1].textContent.trim();
      casheOfTitleFloor = false;
    }
  }

  return result;
}

function setDirection(prevScrollPos, currentScrollPos) {
  const title = setFloorTitle(currentScrollPos);

  if (prevScrollPos < currentScrollPos) {
    directionHtmlElem.innerText = `Kierunek: ${directions.bottom} / ${title}`;
  } else if (prevScrollPos > currentScrollPos) {
    directionHtmlElem.innerText = `Kierunek: ${directions.top} / ${title}`;
  }
}

elevator.addEventListener("scroll", e => {
  let prevScrollPos = currentScrollPos;
  currentScrollPos = Math.round(e.target.scrollTop);

  setTimeout(function() {
    setDirection(prevScrollPos, currentScrollPos);
  }, 200);
});
