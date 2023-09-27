let startButtonWasClicked = false;
let timerEnded = false;
let stopButtonWasClicked = false;

//getting the dom references
const hoursSpan = document.querySelector("#hours");
const minutesSpan = document.querySelector("#minutes");
const secondsSpan = document.querySelector("#seconds");

//initial vallues
const initialHour = hoursSpan.textContent;
const initialMinute = minutesSpan.textContent;
const initialSecond = secondsSpan.textContent;

//adding eventListener
const timerBtn = document.querySelector("#timer-start");
timerBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if(!startButtonWasClicked) {
        TimerStart();
    } else if(timerEnded) {
        TimerReset();
    } else {
        TimerStop();
    }
});

function TimerReset() {
    document.querySelector("#timer").style.width = "16em";
    timerBtn.textContent = "Старт"
    timerBtn.style.backgroundColor = "#04AA6D"

    startButtonWasClicked = false;
    timerEnded = false;
    stopButtonWasClicked = false;

    hoursSpan.textContent = initialHour;
    minutesSpan.textContent = initialMinute;
    secondsSpan.textContent = initialSecond;
}

function TimerStop() {
    startButtonWasClicked = false;
    stopButtonWasClicked = true;
    timerBtn.textContent = "Старт";
}

function TimerStart() {

    startButtonWasClicked = true;
    timerBtn.textContent = "Спри"

    //getting the time
    let hours = Number(hoursSpan.textContent);
    let minutes = Number(minutesSpan.textContent);
    let seconds = Number(secondsSpan.textContent);

    let timeInSeconds = (seconds)+(minutes*60)+(hours*60*60);

    let intervalId = setInterval(() => {

        //checking if the timer was paused
        if(stopButtonWasClicked) {
            stopButtonWasClicked = false;
            clearInterval(intervalId);
            return;
        }

        //converting seconds to minutes and hours
        SecondToHoursAndMinutes(timeInSeconds);
        
        //checking if the timer ended
        if(timeInSeconds === 0) {
            timerEnded = true;
            PostTimerEndActions(timerEnded);
            clearInterval(intervalId);
        }
        
        timeInSeconds--;

    }, 900) 

    function SecondToHoursAndMinutes(time) {

        //checking if the seconds are 0 beforehand
        //since 0 divided to everything is 0
        if(time === 0) {
            hoursSpan.textContent = "00";
            minutesSpan.textContent = "00";
            secondsSpan.textContent = "00";
            return;
        }

        minutes = ((time/60) - (hours*60));
        seconds = (time%60).toFixed(0);

        //once an hour passes it is dividable to 3600 seconds
        if(time % 3600 === 0) {
            hours = ((time/60)/60).toFixed(0) - 1;
            minutes = 59;
            seconds = 59;
        } 

        //i am converting the minutes to string since i only need
        //the first two numers
        let temp = minutes.toString();
        minutes = Number(temp.slice(0, 2));
        
        if(hours === 0 || hours < 10) {
            hoursSpan.textContent = "0" + hours.toString();  
        } else {
            hoursSpan.textContent = hours.toString();
        }

        if(minutes === 0 || minutes < 10) {
            minutesSpan.textContent = "0" + minutes.toString();
        } else {
            minutesSpan.textContent = minutes.toString();
        }
        if(seconds === 0 || seconds < 10) {
            secondsSpan.textContent = "0" + seconds.toString();
        } else {
            secondsSpan.textContent = seconds.toString();
        }

    }

    function PostTimerEndActions(didTheTimerEnd) {
        if(didTheTimerEnd) {
            timerBtn.style.backgroundColor = "red";
            timerBtn.textContent = "Нулиране";
            document.querySelector("#timer")
            .style.width = "18em";
        }
    }
}
