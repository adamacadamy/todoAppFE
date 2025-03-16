const fetchAndPapulateTasks = async () => {
    
    const tasks = await getTasksRequest();

    tasks.forEach((task) => {
        const tasksContainer = document.querySelector('.tasks-list');
        const taskElement = document.createElement('li');
        const taskNameSpan = document.createElement('span');
        const linksContainer = document.createElement('span');
        const editLink = document.createElement('a');
        
        // Display checkmark if task is completed, empty string otherwise
        taskNameSpan.textContent = task.is_completed ? '✓' : '';
        taskElement.textContent = task.task; // Task description
        
        linksContainer.classList.add('task-links');
        
        editLink.href = `${window.env.PAGES.TODO_EDIT}/?id=${task.id}`;
        editLink.textContent = 'Edit';
        
        const deleteLink = document.createElement('a');
        deleteLink.href = `${window.env.PAGES.TODO_EDIT}/?id=${task.id}`; // Consider a separate delete URL if needed
        deleteLink.textContent = 'Delete';
        deleteLink.classList.add('delete-btn');
    
        // Append elements
        taskElement.appendChild(taskNameSpan); // Checkmark or empty
        linksContainer.appendChild(editLink);
        linksContainer.appendChild(deleteLink);
        
        taskElement.appendChild(linksContainer); // Add links to the task element
        tasksContainer.appendChild(taskElement);
    }); 
}

