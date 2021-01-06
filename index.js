import "./style.css";

const directions = {
  top: "🔼",
  bottom: "🔽"
};

let currentScrollPos = 0;
let cond = false;
const directionHtmlElem = document.querySelector(".direction");
const elevator = document.querySelector(".elevator");
const floors = document.querySelectorAll(".floor");

function setFloorTitle(scrollPos) {
  let result = "";
  cond = true;

  for (let i = 0; i < floors.length; i++) {
    const { length, [i]: floor } = floors;
    const {
      clientHeight: floor_height,
      offsetTop: floor_top,
      textContent: floor_text
    } = floor;
    const {
      scrollHeight: elev_total_height,
      clientHeight: elev_height
    } = elevator;

    const setTitle = param => {
      result = param.trim();
      cond = false;
    };

    if (scrollPos - floor_height <= floor_top && cond) {
      setTitle(floor_text);
    } else if (scrollPos >= elev_total_height - elev_height && cond) {
      setTitle(floors[length - 1].textContent);
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
