let itemCounter = 0;
const MAXIMUM_ITEMS = 10;

const maximumMessage = document.querySelector('.maximum-message');
const inputField = document.querySelector('.todo-add_input');
const addButton = document.querySelector('.todo-add_button');
const todoList = document.querySelector('.todo-list');

inputField.oninput = function (event) {
    const inputText = inputField.value.trim();
    addButton.disabled = !inputField;

    if (event.key === 'Enter' && inputText) {
        addItem(inputText);
    }
}

addButton.onclick = function () {
    addItem(inputField.value.trim());
}

const addItem = function(inputText) {
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'todo-list_item');
    listItem.setAttribute('draggable', true);
        
    const text = document.createElement('span');
    text.appendChild(document.createTextNode(inputText));

    const checkIcon = document.createElement('i');
    checkIcon.setAttribute('class', 'material-icons');
    checkIcon.appendChild(document.createTextNode('check_box_outline_blank'));

    const deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class', 'material-icons');
    deleteIcon.appendChild(document.createTextNode('delete'));

    const checkButton = document.createElement('button');
    checkButton.setAttribute('class', 'todo-list_checkbox');

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'todo-list_remove_item');

    checkButton.appendChild(checkIcon);
    checkButton.appendChild(text);
    deleteButton.appendChild(deleteIcon);
    listItem.appendChild(checkButton);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);

    if (++itemCounter >= MAXIMUM_ITEMS) {
        inputField.disabled = true;
        maximumMessage.style.visibility = 'visible';
    }

    checkButton.onclick = function () {
        checkIcon.textContent = 'check_box';
    }

    deleteButton.onclick = function () {
        listItem.remove();
        itemCounter--;
        inputField.disabled = false;
        maximumMessage.style.visibility = 'hidden';
    }

    inputField.value = '';
    addButton.disabled = true;
}

let dragged;

todoList.addEventListener('dragstart', function( event ) {     
    dragged = event.target;      
    event.target.style.opacity = 0.5;
}, false);

todoList.addEventListener('dragend', function( event ) {     
    event.target.style.opacity = '';
}, false);
  
todoList.addEventListener('dragover', function( event ) {     
    event.preventDefault();
}, false);

todoList.addEventListener('dragenter', function( event ) {      
    if ( event.target.className === 'todo-list_item' ) {
        event.target.style.border = 'dotted';
    }
}, false);

todoList.addEventListener('dragleave', function( event ) {      
    if ( event.target.className === 'todo-list_item' ) {
        event.target.style.border = '';
    }
}, false);

todoList.addEventListener('drop', function( event ) {     
    event.preventDefault();     
    if ( event.target.className === 'todo-list_item' ) {
        event.target.style.border = '';
        todoList.insertBefore(dragged, event.target);
    }    
}, false);