﻿const initialData = {
    columns: [
        {
            id: 'todo',
            title: 'В планах',
            tasks: [
                {id: 'task1', title: 'Здати лабораторну 1', description: 'От от здам'},
                {id: 'task2', title: 'Здати лабораторну 2', description: 'Оце щас як здам'}
            ]
        },
        {
            id: 'in-progress',
            title: 'В процесі...',
            tasks: [
                {id: 'task3', title: 'Здати лабораторну 3', description: 'Ща-ща здам'}
            ]
        },
        {
            id: 'done',
            title: 'Зроблено',
            tasks: [
                {id: 'task4', title: 'Раптопий додеп!', description: 'ДЕПАЙ ДЕПАЙ ДЕПАЙ!'}
            ]
        }
    ]
};


const kanbanBoard = document.getElementById('kanbanBoard');


let draggedTask = null;
let placeholder = null;
let currentDragColumn = null;


function initKanbanBoard(data) {
    kanbanBoard.innerHTML = '';

    data.columns.forEach(column => {
        const columnElement = document.createElement('div');
        columnElement.className = 'column';
        columnElement.dataset.columnId = column.id;

        columnElement.innerHTML = `
                    <div class="column-header">
                        <span>${column.title}</span>
                    </div>
                    <div class="tasks" data-column-id="${column.id}">
                        ${column.tasks.map(task => createTaskHtml(task)).join('')}
                    </div>
                    <div class="task-form" data-column-id="${column.id}">
                        <input type="text" class="task-title-input" placeholder="Назва завдання">
                        <textarea class="task-description-input" placeholder="Опис завдання"></textarea>
                        <div class="form-buttons">
                            <button class="add-btn" data-column-id="${column.id}">Додати</button>
                            <button class="cancel-btn" data-column-id="${column.id}">Скасувати</button>
                        </div>
                    </div>
                `;

        kanbanBoard.appendChild(columnElement);


        column.tasks.forEach(task => {
            const taskElement = columnElement.querySelector(`.task[data-task-id="${task.id}"]`);
            setupTaskDragEvents(taskElement);
        });
    });


    setupColumnDropEvents();
}


function createTaskHtml(task) {
    return `
                <div class="task" draggable="true" data-task-id="${task.id}">
                    <div class="task-title">${task.title}</div>
                    <div class="task-description">${task.description}</div>
                </div>
            `;
}


function setupTaskDragEvents(taskElement) {
    taskElement.addEventListener('dragstart', (e) => {
        draggedTask = taskElement;
        taskElement.classList.add('dragging');
        e.dataTransfer.setData('text/plain', taskElement.dataset.taskId);
        e.dataTransfer.effectAllowed = 'move';


        placeholder = document.createElement('div');
        placeholder.className = 'task-placeholder';
        taskElement.parentNode.insertBefore(placeholder, taskElement.nextSibling);


        currentDragColumn = taskElement.closest('.column');
        currentDragColumn.classList.add('highlight');
    });

    taskElement.addEventListener('dragend', () => {
        taskElement.classList.remove('dragging');
        document.querySelectorAll('.column').forEach(col => col.classList.remove('highlight'));


        if (placeholder && placeholder.parentNode) {
            placeholder.parentNode.removeChild(placeholder);
        }
        placeholder = null;
        currentDragColumn = null;
    });
}


function setupColumnDropEvents() {
    document.querySelectorAll('.column').forEach(column => {
        const tasksContainer = column.querySelector('.tasks');

        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            column.classList.add('highlight');

            if (!draggedTask) return;


            const afterElement = getDragAfterElement(tasksContainer, e.clientY);


            if (placeholder && placeholder.parentNode === tasksContainer) {
                tasksContainer.removeChild(placeholder);
            }


            if (afterElement) {
                tasksContainer.insertBefore(placeholder, afterElement);
            } else {
                tasksContainer.appendChild(placeholder);
            }
        });

        column.addEventListener('dragleave', () => {
            column.classList.remove('highlight');


            if (placeholder && placeholder.parentNode === tasksContainer) {
                tasksContainer.removeChild(placeholder);
            }
        });

        column.addEventListener('drop', (e) => {
            e.preventDefault();
            column.classList.remove('highlight');

            if (draggedTask) {
                const tasksContainer = column.querySelector('.tasks');
                const taskId = draggedTask.dataset.taskId;


                const afterElement = getDragAfterElement(tasksContainer, e.clientY);

                if (afterElement) {
                    tasksContainer.insertBefore(draggedTask, afterElement);
                } else {
                    tasksContainer.appendChild(draggedTask);
                }


                if (placeholder && placeholder.parentNode === tasksContainer) {
                    tasksContainer.removeChild(placeholder);
                }


                updateTaskColumn(taskId, column.dataset.columnId);
            }
        });
    });
}


function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child};
        } else {
            return closest;
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element;
}

function updateTaskColumn(taskId, newColumnId) {

    console.log(`Завдання ${taskId} переміщено до колонки ${newColumnId}`);
}


initKanbanBoard(initialData);