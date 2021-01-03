import "./style.css";

const directions = {
  top: "🔼",
  bottom: "🔽"
};

let currentScrollPos = 0;

// DOM elemenst
const directionElem = document.querySelector(".direction");
const elevator = document.querySelector(".elevator");

function setDirection(prevScrollPos, currentScrollPos) {
  if (prevScrollPos < currentScrollPos) {
    directionElem.innerText = `Kierunek: ${directions.bottom}`;
  } else if (prevScrollPos > currentScrollPos) {
    directionElem.innerText = `Kierunek: ${directions.top}`;
  }
}

function setScrollPeriod(prevScrollPos, currentScrollPos) {
  setTimeout(function() {
    setDirection(prevScrollPos, currentScrollPos);
  }, 200);
}

elevator.addEventListener("scroll", e => {
  let previewScrollPos = currentScrollPos;
  currentScrollPos = Math.round(e.target.scrollTop);

  setScrollPeriod(previewScrollPos, currentScrollPos);
});
