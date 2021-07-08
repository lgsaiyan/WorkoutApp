export const elements = {
    
    createBtn: document.querySelector('.create_btn'),
    createCreator: document.querySelector('.right'),
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