import {elements, resetHome, clearRight} from '../views/base';
import {getVoice} from './Speech';
var beep = new Audio('sounds/beep.wav');
var finish = new Audio('sounds/finish.wav');

export default class List {
    constructor() {
    this.workouts = [];
    this.inPlay = 0; // 0 = not running, 1 = running, 2 = paused
    };

    addWorkout(workout) {
        this.workouts.push(workout);

        // Add to local storage
        this.persistData();
    };

    deleteWorkout(id) { 
        const index = this.workouts.findIndex(el => el.id == id); // Normally use === but date.Now() doesn't output number, so in this case used ==
        if(index !== -1){
          this.workouts.splice(index, 1)
        };

        // Update local storage
        this.persistData();

    };
    
    playWorkout(id) {
        this.inPlay = 1; // helps determine state of app 
        const index = this.workouts.findIndex(el => el.id == id); // Normally use === but date.Now() doesn't output number, so in this case used ==
        if(index !== -1){
          const timer = ()=>{
            const array = this.workouts[index];
            let totalTime = array.totalDuration;
            let formattedTime = array.totalDurationMins; 
            let i = 0;
            let currentEx = array.exercises[i].name; // to start off with
            let currentExDur = array.exercises[i].duration; // to start off with
            
            //Display timer (inital)
            clearRight();
            const updateHTML = () => {
              const html = `
                <div class="timer">
                  <div class="workout_label">
                      ${array.name}
                  </div>
                  <div class="workout_timer">
                      ${formattedTime}
                  </div>
                  
                  <div class="exercise_label">
                      ${currentEx}
                  </div>
                  <div class="exercise_timer">
                      ${currentExDur}
                  </div>
                </div> 
                `
              const render =  document.querySelector('.right');
              render.insertAdjacentHTML('afterbegin', html);
            };
            updateHTML();   

            // Display PAUSE and CANCEL buttons
            const addHTMLBtns = () => {
              const html = `
                <div class="controls">
                  <button class="btn PR">PAUSE</button>
                  <button class="btn cancel">CANCEL</button>
                </div> 
                `
              const render =  document.querySelector('.timer');
              render.insertAdjacentHTML('beforeend', html);
            };
            addHTMLBtns();
            
            //CANCEL BUTTON
            document.querySelector('.cancel').addEventListener('click', ()=>{
              clearRight();
              resetHome();
              clearInterval(interval);
              this.inPlay = 0;
            });

            // Var declarations for storage and controls 
            let savedTotalTime = 0;
            let savedCurrentEx = 0;
            let savedCurrentExDur = 0;
            let controlState = 0;

            //PAUSE & RESUME BUTTON       ****************************************************************************   
            const controls = ()=>{
              document.querySelector('.PR').addEventListener('click', ()=>{
                //To Pause
                if(controlState === 0){
                  // save timer info for resume
                  savedTotalTime = totalTime;
                  savedCurrentEx = currentEx;
                  savedCurrentExDur = currentExDur;

                  // clear interval if condition is met
                  clearInterval(interval);

                  // add resume button
                  const render =  document.querySelector('.PR');
                  render.innerHTML = `RESUME`;

                  // change state and engage resume button
                  this.inPlay = 2;
                  controlState = 1;

              } else {
              // To Resume

                // revert to pause btn
                const render =  document.querySelector('.PR');
                render.innerHTML = `PAUSE`;

                // change state and restart interval 
                this.inPlay = 1;
                totalTime = savedTotalTime;
                currentEx = savedCurrentEx;
                currentExDur = savedCurrentExDur;

                controlState = 0;
                intervalPlay();
              
              };
            })}; // end of button controls
            controls();

            //Update timer values
            const updateTimer = () => {             
              document.querySelector('.workout_label').innerHTML = `${array.name}`
              document.querySelector('.workout_timer').innerHTML = `${formattedTime}`
              document.querySelector('.exercise_label').innerHTML = `${currentEx}`
              document.querySelector('.exercise_timer').innerHTML = `${currentExDur}`
            };

            // Interval function 
            function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s};
            var counter = 0;
            let interval;
            const returner = ()=> {
              this.inPlay = 0;
            };

            //Announce Workout
            setTimeout(getVoice(`Starting, ${array.name}, in three, two, one`), 1);

            function intervalPlay (){
              //Announce first exercise
              setTimeout(getVoice(currentEx), 3500);
              interval = setInterval(() => {
                // Update Model
                totalTime += - 1;
                formattedTime = fmtMSS(totalTime);      

                if ((currentExDur === 1) && (i < (array.exercises.length -1))){
                  i += 1; //updates exercise in model
                  currentEx = array.exercises[i].name;
                  currentExDur = array.exercises[i].duration;
                  
                  // play sound for new exercise
                  beep.play();
                  
                  // read new exercise
                  setTimeout(getVoice(currentEx), 1000);


                } else if (currentExDur === 1 && (i === array.exercises.length - 1)){
                  currentEx = "Good work, fam"
                  currentExDur = "FINISHED!"
                  finish.play();
                  setTimeout(getVoice('Well done'), 5000);

                } else {
                  currentExDur += -1;
                };

                // Update view
                updateTimer();

                //Check end of timer
                counter++
                if(counter === array.totalDuration){
                  clearInterval(interval);
                  returner();
                  const deleteBtns = () => {
                    const render =  document.querySelector('.controls');
                    render.innerHTML = "";
                  };
                  deleteBtns();
                };              
              }, 1000); 
              setTimeout(interval, 250);
            }; // end of intervalPlay function
            setTimeout(intervalPlay, 5000) // timer autostart
          };
            timer();          
        };
    };

    persistData() {
      localStorage.setItem('workouts',JSON.stringify(this.workouts));
    };

    readStorage() {
      const storage = JSON.parse(localStorage.getItem('workouts'));

      //Restore workouts in the list obect from local storage
      if(storage) this.workouts = storage;
    }
};
