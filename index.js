import "./style.css";

const directions = {
  top: "🔼",
  bottom: "🔽"
};

let currentScrollPos = 0;

const directionHtmlElem = document.querySelector(".direction");
const elevator = document.querySelector(".elevator");
const floors = document.querySelectorAll(".floor");

const arrayFloors = Array.from(floors).map(e => {
  return {
    top: e.offsetTop,
    bottom: e.offsetTop + e.offsetHeight,
    title: e.textContent
  };
});

console.log(arrayFloors);

function setDirection(prevScrollPos, currentScrollPos) {
  if (prevScrollPos < currentScrollPos) {
    directionHtmlElem.innerText = `Kierunek: ${directions.bottom}`;
  } else if (prevScrollPos > currentScrollPos) {
    directionHtmlElem.innerText = `Kierunek: ${directions.top}`;
  }

  setFloorName(currentScrollPos);
}

function setFloorName(currentScrollPos) {
  floors.forEach((e, i) => {
    let top = e.offsetTop,
      bottom = e.offsetTop + e.scrollHeight,
      title = e.textContent;

    if (currentScrollPos > top && currentScrollPos < bottom) {
      // console.log("top", top);
      // console.log("height", e.offsetHeight);
      // console.log("currentScrollPos", currentScrollPos);
      // console.log("bottom", bottom);
      console.log(title);
    }
  });
}

elevator.addEventListener("scroll", e => {
  let prevScrollPos = currentScrollPos;
  currentScrollPos = Math.round(e.target.scrollTop);

  setTimeout(function() {
    setDirection(prevScrollPos, currentScrollPos);
  }, 200);
});
