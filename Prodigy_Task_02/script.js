const display = document.getElementById("display");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const status = document.getElementById("status");
const lapsContainer = document.getElementById("laps");

let seconds = 0;
let timer = null;
let lapNumber = 0;


// Update stopwatch display
function updateDisplay() {

    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    secs = String(secs).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${secs}`;
}


// Start button
startBtn.addEventListener("click", function () {

    if (timer !== null) {
        return;
    }

    status.textContent = "Running...";

    timer = setInterval(function () {
        seconds++;
        updateDisplay();
    }, 1000);

});

pauseBtn.addEventListener("click", function () {

    if (timer === null) {
        return;
    }

    clearInterval(timer);
    timer = null;

    status.textContent = "Paused";
});


// Lap button
lapBtn.addEventListener("click", function () {

    // Don't create a lap if stopwatch isn't running
    if (timer === null) {
        return;
    }

    lapNumber++;

    const lapItem = document.createElement("div");

    lapItem.classList.add("lap-item");

    lapItem.innerHTML = `
        <span>Lap ${lapNumber}</span>
        <span>${display.textContent}</span>
    `;

    lapsContainer.appendChild(lapItem);

});


// Reset button
resetBtn.addEventListener("click", function () {

    clearInterval(timer);

    timer = null;
    seconds = 0;
    lapNumber = 0;

    lapsContainer.innerHTML = "";

    status.textContent = "Ready";

    updateDisplay();
});
