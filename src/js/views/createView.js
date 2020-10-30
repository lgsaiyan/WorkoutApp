import {elements} from './base'

// Render Workout Creator

export const renderCreate = () => {
    const html = `
    <div class="create_head">
                CREATE A WORKOUT
            </div>
            <div class="div_input">
               <input class ="input_workout" placeholder="Name of workout"></input> 
            </div>
                <div class="create_inputs">
                    <input class="input_ex" placeholder="Name of exercise"></input>
                    <input class="input_dur" placeholder="Duration (sec)"></input> 
                    <img class="plus small-btn" src=./img/plus.png></img>
                </div>            
            <div class="save_cancel">
                <button class="btn save">SAVE</button>
                <button class="btn cancel" id="bitch">CANCEL</button>
            </div>             
    `

    elements.createCreator.insertAdjacentHTML('afterbegin', html);
};

export const renderExerciseTable = () => {
    const html = `
    <div class="list_create">
                <div class="table_div">
                    <table class="table_list_ex">
                        <tr>
                            <th>EXERCISE</th>
                            <th>DURATION</th>
                        </tr>
                    </table>
                </div>
            </div>        
    `
    const createExerciseList =  document.querySelector('.create_inputs');    
    createExerciseList.insertAdjacentHTML('afterend', html);
};

export const renderExerciseItem = (name, duration) => {
    const html = `
    <tr class="highlight">
        <td>${name}</td>
        <td>${duration} sec<td>
    </tr>   
    `
    const createExerciseItem = document.querySelector('.table_list_ex');
    createExerciseItem.insertAdjacentHTML('beforeend', html);
};

export const clearInputs = () => {
    const inputEx = document.querySelector('.input_ex');
    const inputDur = document.querySelector('.input_dur'); 
    inputEx.value = '';
    inputDur.value = '';
};
