let taskListArray = JSON.parse(localStorage.getItem("tasks")) || []; // store all tasks
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('input-task');
const addTaskButton = document.getElementById('add-task-button');

// Add task function
let createTask = () => {
    if (taskInput.value != 0){
        const newTask = document.createElement('li');
        const checkboxTask = document.createElement('input');
        checkboxTask.type = 'checkbox';
        const textTask = document.createElement('span');
        textTask.classList.add('task');
        const deleteButtonTask = document.createElement('button');
        deleteButtonTask.classList.add('delete-btn');
        const newTaskText = taskInput.value;
        textTask.append(newTaskText);
        taskList.appendChild(newTask).append(checkboxTask, textTask, deleteButtonTask);
        const taskObject = {
            checkbox: checkboxTask.checked,
            task: textTask.innerHTML
        }
        taskListArray.push(taskObject);
        localStorage.setItem('tasks', JSON.stringify(taskListArray));
        taskInput.value = '';
        deleteTask(deleteButtonTask, taskObject, newTaskText);
        taskComplete(checkboxTask, taskObject, textTask, newTaskText);
    }
}

// Add task to list
addTaskButton.addEventListener('click' , createTask);
taskInput.addEventListener('keypress' ,  (keyPressed) => {
    if (keyPressed.key === 'Enter') {
        createTask();
    }
    isArrayEmpty();
});

// Remove task from list function
let deleteTask = (element, object, text, objectIndex) => {
    element.addEventListener('click', () => {
        element.parentElement.remove();
        const index = taskListArray.findIndex(object => {
            return object.task == text;
        });
        if(index === -1) {
            taskListArray.splice(objectIndex, 1);
        }
        else {
            taskListArray.splice(index, 1);
        }
        localStorage.setItem('tasks', JSON.stringify(taskListArray));
        isArrayEmpty();
    });
}

// Task Complete/Incomplete Function
let taskComplete = (checkbox, object, text, span) => {
    checkbox.addEventListener('change', () => {
        let index = taskListArray.findIndex(object => {
            return object.task == span;
        });
        if (checkbox.checked){
            text.classList.add('text-decoration');
            object.checkbox = true;

        } else {
            text.classList.remove('text-decoration');
            object.checkbox = false;
        }
        localStorage.setItem('tasks', JSON.stringify(taskListArray));
    });
}

// Load list from local storage
let getFromLocalStorage = () => {
    isArrayEmpty();
    for (let i = 0; taskListArray.length > i; i++) {
        const li = document.createElement('li');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = taskListArray[i].checkbox;
        const span = document.createElement('span');
        if (input.checked){
            span.classList.add('text-decoration');
        }
        else if (input.checked = false){
            span.classList.remove('text-decoration');
        }
        span.classList.add('task');
        span.append(taskListArray[i].task);
        const button = document.createElement('button');
        button.classList.add('delete-btn');
        taskList.appendChild(li).append(input, span, button);
        deleteTask(button, taskListArray[i], span , i)
        taskComplete(input, taskListArray[i], span, span)

    }
}

//Check function to display icon when array(todos) is empty.
let isArrayEmpty = () => {
    const iconBlock = document.getElementById('no-tasks-yet');
    if (taskListArray.length != 0) {
        iconBlock.style.display = 'none'
    }
    else {
        iconBlock.style.display = 'block'
    }
}

//Event to get elements after page reload
document.addEventListener('DOMContentLoaded', getFromLocalStorage);





