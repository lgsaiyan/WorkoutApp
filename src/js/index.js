import {elements, clearRight, resetHome} from './views/base';
import * as createView from './views/createView';
import * as listView from './views/listView';
import Workout from './models/Create';
import List from './models/List';

//// INITIALIZATION ////

// 1. Set inital variables and objects

const state = {};
state.list = new List();
listController();
let isRendered = 0;

// 2. Load and render saved workouts (if exists)
window.addEventListener('load', ()=> {
    state.list.readStorage();
    if(state.list.workouts.length > 0) {
        listView.renderListHeading();
        isRendered = 1;
        //render list
        let i=0;
        for (i=0; i < state.list.workouts.length; i++){
        listView.renderList(state.list.workouts[i].name, state.list.workouts[i].totalDurationMins, state.list.workouts[i].id)
        listController();
        };
    };
});


//// CREATE A WORKOUT CONTROLLER ////
// 1. Create workout view (if workout not currently playing)
elements.createBtn.addEventListener('click', ()=>{ 
    // Clear current HTML
    if(state.list.inPlay === 0 || state.list.inPlay === 2){
        clearRight();
        //Render Create workout view and import new elements
        createView.renderCreate();

        // 2. Create new workout object
        state.workout = new Workout('TempName');
        
        // 3. Add exercises functionality 
        addButton();

        // 4. Save and Cancel Functionality
        saveButton();
        cancelButton();
    };
});

//// WORKOUT LIST CONTROLLER ////
function listController() {
    if(state.list.workouts.length > 0){ 
    // 1. Delete workout       
        //Create array of all html elements in the list to loop thru
        const deleteList = document.querySelectorAll('.delete')
        deleteList[deleteList.length - 1].addEventListener('click', (e) =>{ 
            // Identify correct list item to delete
            const id = e.target.closest ('.delete').id;

            // Remove workout from model  
            state.list.deleteWorkout(id); 

            // Remove workout from view
            listView.deleteWorkout(id);            

            if(state.list.workouts.length > 0){
                return state.list; 
            } else {
                return state.list;
            }
        });

        // 2. Play workout
        const playList = document.querySelectorAll('.play')
        playList[playList.length - 1].addEventListener('click', (e) =>{ 
            // Identify correct list item to play
            const id = e.target.closest ('.play').id;
            //Play workout IF existing workout is not running
            if(state.list.inPlay === 0 || state.list.inPlay === 2){
            state.list.playWorkout(id);
            };
        });
    };  
};


/////////////////////////////////////////////
////// Reference Functions for above/////////

const addButton = ()=> {
    document.querySelector('.plus').addEventListener('click', () =>{
        //Get workout name
        let inputName = '';
        let inputExName = '';
        let inputDuration = '';

        const getName = () => {
            const inputWO = document.querySelector('.input_workout');
            inputName = inputWO.value;
            return {inputName};
        };
        getName();

        //Get exercise name and duration
        const getInputs = () => {
            const inputEx = document.querySelector('.input_ex');
            const inputDur = document.querySelector('.input_dur');
            inputExName = inputEx.value;
            inputDuration = parseFloat(inputDur.value);            
            return {inputExName, inputDuration};          
        };
        getInputs();

        //Add exercise to workout (model) / (also updates Workout Name)
        if(inputDuration !== "" && !isNaN(inputDuration) && inputDuration > 0) {
            state.workout.addExercise(inputExName, inputDuration);
            state.workout.name = inputName;

            //Add exercise (view)
            if(state.workout.exercises.length === 1) {
            createView.renderExerciseTable();     
            };        
            createView.renderExerciseItem(inputExName, inputDuration); 

            //Clear Inputs (view)
            createView.clearInputs();

        } else {
                alert("You must enter a number greater than 0 for the duration.")
            };   
    });
};

const cancelButton = ()=> {    
    document.querySelector('.cancel').addEventListener('click', ()=>{
        clearRight();
        resetHome();
    });
};        

const saveButton = ()=> {    
    document.querySelector('.save').addEventListener('click', ()=>{
        // Save Workout to List (model)
        if(state.workout.exercises.length > 0){
            //Calc total duration of workout
            state.workout.calcDuration();
            //Add to list
            state.list.addWorkout(state.workout);     
            // Display/update List (view)
            if(isRendered === 0){
                listView.renderListHeading();
                listView.renderList(state.workout.name, state.workout.totalDurationMins, state.workout.id);
                // Reset home screen
                clearRight();
                resetHome();
                listController();
                return isRendered = 1, state.list
            } else {
                listView.renderList(state.workout.name, state.workout.totalDurationMins, state.workout.id);
                // Reset home screen
                clearRight();
                resetHome();
                listController();
                return state.list;
            };

        } else {
            alert("You cannot save a workout without adding exercises.")
        };
    });
};  



















