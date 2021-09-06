const timeInput = document.querySelectorAll('.select-time');

timeInput.forEach(
   index => {
      index.addEventListener('keyup', inputNumber);
   }
);

/**
 * Event type
 * @param {*} e 
 */
function inputNumber(e){

      // regular expression //
      var regex = /[^0-9]/gi;
      e.target.value = e.target.value.replace(regex, '');

   if(Number(e.target.value) >= 60){
      e.target.value = 59;
   }
   
   if((e.target.value).toString().charAt(0) === '0'){
      e.target.value = Number(e.target.value);
   }

   if(e.target.value === ''){
      e.target.value = 0;
   }

   console.log(e.target.value);
   console.log(e.key);
}


///////////////////////////////////////////////////////
/////////////// MAIN SCRIPT OF TIMER //////////////////
///////////////////////////////////////////////////////


const displayHours = document.getElementById('hours');
const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');

const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');

const volumeSlider = document.getElementById('volume-slider');

let timer = {
   countDown: null,
   sound: new Audio(),
   time: {
      hours: 0,
      minutes: 0,
      seconds: 0
   },
   setTime: {
      hours: null,
      minutes: null,
      seconds: null
   },
   totalSeconds: 0,
   startedTime: 0,
   endTime: null
};

function displayTime(){
   let totalSeconds = timer.totalSeconds;

      timer.time.seconds = Math.floor(totalSeconds % 60);
      timer.time.minutes = Math.floor((totalSeconds / 60) % 60);
      timer.time.hours = Math.floor((totalSeconds / 60 / 60));

   displayHours.value = timer.time.hours;
   displayMinutes.value = timer.time.minutes;
   displaySeconds.value = timer.time.seconds;
}

/////// start-stop ///////

startStopButton.onclick = () => {
   stopPlay();

   if(startStopButton.innerText === 'start')
   {

      timer.setTime.hours = displayHours.value;
      timer.setTime.minutes = displayMinutes.value;
      timer.setTime.seconds = displaySeconds.value;

      if(timer.totalSeconds === 0){
         timer.totalSeconds = (Number(timer.setTime.hours) * 60 * 60) + (Number(timer.setTime.minutes * 60)) + Number(timer.setTime.seconds);
      }
      console.log(timer.totalSeconds);

      if(timer.startedTime === 0){
      timer.startedTime = (Date.now() / 1000) - Math.floor(Date.now() / 1000);
      }
      timer.endTime = timer.startedTime + timer.totalSeconds + Date.now() / 1000;

      if(timer.totalSeconds > 0) {
         timer.countDown = setInterval(countDown, 200)
         startStopButton.innerText = 'stop';
         startStopButton.classList.remove('green');
         startStopButton.classList.add('red');
      }
      else
      alert('You did not set the timer');
   }

   else {
      startStopButton.innerText = 'start';
      startStopButton.classList.remove('red');
      startStopButton.classList.add('green');
      clearInterval(timer.countDown);
   }
}

/////// reset ////////

resetButton.onclick = () => {
   resetAll();
   stopPlay();
}

function countDown(){

   //// include +1 to have 1 second delay ////
   timer.totalSeconds = timer.endTime - ((Date.now() / 1000) + timer.startedTime); 

   if(timer.totalSeconds <= 0){
      clearInterval(timer.countDown);
      playSound();
      resetAll();
      startStopButton.innerText = 'stop';
      startStopButton.classList.remove('green');
      startStopButton.classList.add('red');
   }
   else
   displayTime();
}

function resetAll(){
   clearInterval(timer.countDown);
   timer.endTime = null;
   timer.totalSeconds = 0;
   timer.startedTime = 0;
   timer.time = { hours: 0, minutes: 0, seconds: 0};
   timer.setTime = { hours: null, minutes: null, seconds: null};
   timer.countDown = null;

   displayTime();

   startStopButton.innerText = 'start';
   startStopButton.classList.remove('red');
   startStopButton.classList.add('green');
}

///// WROKING WITH THE SOUND /////

function playSound(){
   timer.sound = new Audio('purple-lambo.mp3');
   timer.sound.loop = true;
   timer.sound.volume = volumeSlider.value / 100;
   timer.sound.play();
}

function stopPlay(){
   if(!timer.sound.paused){
      timer.sound.pause();
   }
}

volumeSlider.addEventListener('mousemove', setVolume);

function setVolume(){
   timer.sound.volume = volumeSlider.value / 100;
}
