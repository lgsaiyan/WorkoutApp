// Render Workout List

export const renderListHeading = () => {
    const html = `
    <div class="table_div">
        <table class="table_list">
            <tr>
                <th></th>
                <th>WORKOUT</th>
                <th>DURATION</th>
                <th></th>
            </tr>           
        </table>
    </div>            
    `
    const render =  document.querySelector('.list_panel');
    render.insertAdjacentHTML('afterbegin', html);
};

export const renderList = (name, duration, id) => {
    const html = `
    <tr class="highlight">
        <td>
            <img class="delete small-btn" id="${id}" src=./img/delete.png></img>
        </td>
        <td>${name}</td>
        <td>${duration}</td>
        <td>
            <img class="play small-btn" id="${id}" src=./img/play.png></img>
        </td>
    </tr>            
    `
    const render =  document.querySelector('.table_list');
    render.insertAdjacentHTML('beforeend', html);
};

export const deleteWorkout = id => {
    const item = document.getElementById(`${id}`)
    const itemParent = item.parentElement.parentElement;
    if (itemParent) itemParent.parentElement.remove(item);
};