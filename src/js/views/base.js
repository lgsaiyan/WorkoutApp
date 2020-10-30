export const elements = {
    
    createBtn: document.querySelector('.create_btn'),
    createCreator: document.querySelector('.right'),

    // These are placed in seperate modules - NOT USED FROM CURRENT EXPORT - IGNORE
    /*
    createExerciseList: document.querySelector('.create_inputs'),
    createExerciseItem: document.querySelector('.table_list_ex'),
    cancelBtn: document.querySelector('.cancel'),
    inputEx: document.querySelector('.input_ex'),
    inputDur: document.querySelector('.input_dur'),
    inputWO: document.querySelector('.input_workout')
    */
};

export const clearRight = () => {
    elements.createCreator.innerHTML = '';
}

export const resetHome = () => {
    const html = 
    `
    <div>
        <img src="./img/main.png" class="img_main"></img>
    </div>    
    `
    elements.createCreator.insertAdjacentHTML('afterbegin', html);
};