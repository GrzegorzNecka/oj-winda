import "./style.css";

const directions = {
  top: "🔼",
  bottom: "🔽"
};

let currentScrollPos = 0;

const directionHtmlElem = document.querySelector(".direction");
const elevator = document.querySelector(".elevator");
const floors = document.querySelectorAll(".floor");

/**
 * functions
 */

function setFloorName(currentScrollPos) {
  let result = "";

  [...floors].forEach(function(floor) {

        let sectionScroll = floor.offsetTop,
        sectionHeigth = floor.scrollHeight,
        distance = sectionScroll - currentScrollPos,
        procent = (-distance * 100) / currentScrollPos;

      if (procent >= -10 && procent <= 90) {
          result = floor.textContent.trim()
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
