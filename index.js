import "./style.css";

const directions = {
  top: "🔼",
  bottom: "🔽"
};

let currentScrollPos = 0;
let cash = false;
const directionHtmlElem = document.querySelector(".direction");
const elevator = document.querySelector(".elevator");
const floors = document.querySelectorAll(".floor");

function setFloorTitle(scrollPos) {
  let result = "";
  cash = true;

  for (let i = 0; i < floors.length; i++) {
    
    const floor = {
      elem: floors[i],
      lastElem : floors[floors.length - 1],
      height: floors[i].clientHeight,
      top: floors[i].offsetTop,
    };

    const elev = {
      totalHeight: elevator.scrollHeight,
      height: elevator.clientHeight
    };

    const setTitle = param => {
      result = param.trim();
      cash = false;
    };

    if (scrollPos - floor.height <= floor.top && cash) {
      setTitle(floor.elem.textContent);
    } else if (scrollPos >= elev.totalHeight - elev.height && cash) {
      setTitle(floor.lastElem.textContent);
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
