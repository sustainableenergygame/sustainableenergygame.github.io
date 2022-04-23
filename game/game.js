window.onload = beginningAnimation();
let climatechangeSelection;
let earthSelection;
let climatechangeScore = 0;
let earthScore = 0;

let buttons = document.querySelectorAll(".button");
const body = document.querySelector("body");
const main = document.querySelector("main");
const endAlrt = document.querySelector("#end-alert");
const endDesc = document.querySelector("#end-desc");
const returnMainBtn = document.querySelector("#retry-btn");
const desc = document.querySelector("#desc3");
const container = document.querySelector("#results-container");

body.addEventListener("click", skipAnime());
body.addEventListener("keydown", skipAnime());

function skipAnime() {
  const span = document.querySelectorAll("span");

  span.forEach((span) => span.classList.add("skip"));
}

function beginningAnimation() {
  fadeIn();
  const desc1 = document.querySelector("#desc1");
  let desc1Span = desc1.querySelectorAll("span");

  desc1Span = Array.from(desc1Span);

  const desc2 = document.querySelector("#desc2");
  const desc3 = document.querySelector("#desc3");

  desc1Span[desc1Span.length - 1].ontransitionend = () => {
    desc1.classList.add("fade-out");

    desc1.addEventListener("animationend", () => {
      desc1.classList.add("disappear");
      desc1.classList.remove("animate");
      desc2.classList.remove("disappear");
      desc2.classList.add("animate");
      fadeIn();
      let desc2Span = desc2.querySelectorAll("span");
      desc2Span = Array.from(desc2Span);

      desc2Span[desc2Span.length - 1].ontransitionend = () => {
        desc2.classList.add("fade-out");
        desc2.addEventListener("animationend", () => {
          desc2.classList.add("disappear");
          desc2.classList.remove("animate");
          desc3.classList.remove("disappear");
          desc3.classList.add("animate");
          fadeIn();

          let desc3Span = desc3.querySelectorAll("span");
          desc3Span = Array.from(desc3Span);

          desc3Span[desc3Span.length - 1].ontransitionend = () => {
            const cta = document.querySelector("#cta");

            cta.classList.add("drop-down");

            cta.addEventListener("animationend", () => {
              const gameCtn = document.querySelector("#game-container");

              setTimeout(function () {
                gameCtn.classList.add("fade-in");
              }, 300);
            });
          };
        });
      };
    });
  };
}
function fadeIn() {
  let text = document.querySelector(".animate");

  let strText = text.textContent;
  let splitText = strText.split("");
  text.textContent = "";
  for (i = 0; i < splitText.length; i++) {
    text.innerHTML += `<span>${splitText[i]}</span>`;
  }

  let char = 0;
  let timer = setInterval(onTick, 50);

  function onTick() {
    const span = text.querySelectorAll("span")[char];
    span.classList.add("fade");
    char++;
    if (char === splitText.length) {
      complete();
      return;
    }
  }
  function complete() {
    clearInterval(timer);
    timer = null;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    earthSelection = img.alt.toLowerCase();

    playRound(earthSelection, climatechangeSelection);

    if (earthScore === 3 || climatechangeScore === 3) {
      declareWinner();
    }
  });
});

const myArray = ["dam", "solarpanel", "windturbine"];

function climatechangePlay() {
  return myArray[~~(Math.random() * myArray.length)];
}

function playRound(earthSelection, climatechangeSelection) {
  climatechangeSelection = climatechangePlay().toLowerCase();
  earthSelection = earthSelection.toLowerCase();
  if (climatechangeSelection == earthSelection) {
    displayResults("Tie game!");
  } else if (
    (climatechangeSelection == "dam" && playerSelection == "windturbine") ||
    (climatechangeSelection == "windturbine" && playerSelection == "solarpanel") ||
    (climatechangeSelection == "solarpanel" && playerSelection == "dam")
  ) {
    climatechangeScore = ++climatechangeScore;
    keepCpuScore();
    if (climatechangeScore === 1) {
      displayResults(
        `How could you! You lost!
        ${capitalize(climatechangeSelection)} beats ${earthSelection}.`
      );
    } else if (earthScore === 2) {
      displayResults(
        `Damn. ${capitalize(
          climatechangeSelection
        )} beats ${earthSelection}. It's match point! Don't let us down!`
      );
    } else {
      displayResults(`${climatechangeSelection} beats ${earthSelection}`);
    }
  } else {
    earthScore = ++earthScore;
    keepPlayerScore();
    if (earthScore === 1) {
      displayResults(
        `Yay! You won a round.
        ${capitalize(earthSelection)} beats ${climatechangeSelection}.`
      );
    } else if (earthScore === 2) {
      displayResults(
        `One more and you'll beat Climate Change! ${capitalize(
          earthSelection
        )} beats ${climatechangeSelection}.`
      );
    } else {
      displayResults(`${earthSelection} beats ${climatechangeSelection}`);
    }
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function displayResults(str) {
  container.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 300,
    fill: "forwards",
    iterations: 1,
    delay: 0,
    easing: "ease-out",
  });
  container.textContent = str;
}

function declareWinner() {
  rplContent();
  if (earthScore > climatechangeScore) {
    endDesc.textContent = "You win! Earth survives another day with sustainable energy!!";
    returnMainBtn.innerText = "Play Again";
  } else {
    endDesc.textContent = "You lost...who will save Earth now, without sustainable energy?";
    returnMainBtn.innerText = "Try Again?";
  }
  fadeIn();

  let endDescSpan = endDesc.querySelectorAll("span");
  endDescSpan = Array.from(endDescSpan);

  endDescSpan[endDescSpan.length - 1].ontransitionend = () => {
    returnMainBtn.classList.add("fade-in");
  };
}

function rplContent() {
  main.classList.add("disappear");
  endAlrt.classList.remove("disappear");
  desc.classList.remove("animate");
  endDesc.classList.add("animate");

  returnMainBtn.addEventListener("click", () => {
    main.classList.remove("disappear");
    endAlrt.classList.add("disappear");
    desc.classList.add("animate");
    returnMainBtn.classList.remove("fade-in");
    resetGame();
  });
}

function resetGame() {
  fadeIn();
  container.textContent = "";
  playerScore = 0;
  computerScore = 0;
  keepPlayerScore();
  keepCpuScore();
}

function keepEarthScore() {
  let earthScoreBox = document.querySelector("#earth-score");

  earthScoreBox.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 300,
    fill: "forwards",
    iterations: 1,
    delay: 0,
    easing: "ease-out",
  });

  earthScoreBox.textContent = earthScore;
}
function keepCpuScore() {
  let climatechangeScoreBox = document.querySelector("#climate-change-score");

  climatechangeScoreBox.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 300,
    fill: "forwards",
    iterations: 1,
    delay: 0,
    easing: "ease-out",
  });

  climatechangeScoreBox.textContent = climatechangeScore;
}
