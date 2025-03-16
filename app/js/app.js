// Email validation function
const validateEmail = (email) => {
    const result = {
        isValid: false,
        message: ''
    };
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        result.message = 'Email is required';
    } else if (!emailRegex.test(email)) {
        result.message = 'Please enter a valid email address';
    } else {
        result.isValid = true;
        result.message = '';
    }
    
    return result;
}
 
// Password validation function
const validatePassword = (password) => {
    const result = {
        isValid: false,
        message: ''
    };
     
    const passwordRegex = /^.{4,}$/;

    if (!password) {
        result.message = 'Password is required';
    } else if (!passwordRegex.test(password)) {
        result.message = 'Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character';
    } else {
        result.isValid = true;
        result.message = ' ';
    }
    
    return result;
}

// Username validation function
const validateUsername = (username) => {
    const result = {
        isValid: false,
        message: ''
    };
     
   
    if (!username) {
        result.message = 'Username is required';
    } else if (username.length < 4 || username.length > 20) {
        result.message = 'Username must be 3-20 characters long and can only contain letters, numbers, underscores, and hyphens';
    } else {
        result.isValid = true;
        result.message = '';
    }
    
    return result;
}


// New Text validation function
const validateText = (text) => {
    const result = {
        isValid: false,
        message: ''
    };

    if (!text) {
        result.message = 'Text is required';
    } else if (text.length <= 4) {
        result.message = 'Text must be more than 4 characters long';
    } else {
        result.isValid = true;
        result.message = '';
    }

    return result;
}

// Function to show error messages (assuming you have this defined)
const showFormError = (message, form) => { 
    let errorElement = form.querySelector('.form-error-message');
    errorElement.textContent = message;
    errorElement.style.display = message ? 'block' : 'none';
};

 
// Function to toggle validation message
const showValidationMessage = (element, validation) => {
    const messageElement = element.nextElementSibling;
    messageElement.textContent = validation.message;
     
    element.style.borderColor = validation.isValid ? 'green' : 'red'; 

    messageElement.classList.toggle('success', validation.isValid);
    messageElement.classList.toggle('error', !validation.isValid);
}
 
document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.querySelector('#logout-link');

    if (logoutLink) {
        logoutLink.addEventListener('click', async (event) => {
            event.preventDefault();
            console.log('logout clicked');
            const logoutStatus = await logoutRequest();
            if (!logoutStatus) {  
                return;
            }             
            window.location.href =  window.env.PAGES.LOGIN;

        });
     }
});
 // Function to get the query parameter value by name
const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

const fetchAndPapulateTasks = async () => {
    
    const tasks = await getTasksRequest();

    tasks.forEach((task) => {
        const tasksContainer = document.querySelector('.tasks-list');
        const taskElement = document.createElement('li');
        const taskNameSpan = document.createElement('span');
        const linksContainer = document.createElement('span');
        const editLink = document.createElement('a');
        const elementId =  `id-${task.id}`;
        // Display checkmark if task is completed, empty string otherwise
        taskNameSpan.textContent = task.is_completed ? '✓' : '';
        taskElement.textContent = task.task; // Task description
        taskElement.setAttribute('id', elementId);
        
        linksContainer.classList.add('task-links');
        
        editLink.href = `${window.env.PAGES.TODO_EDIT}?id=${task.id}`;
        editLink.textContent = 'Edit';
        
        const deleteLink = document.createElement('a');
        deleteLink.href = `${window.env.PAGES.TODO_EDIT}?id=${task.id}`; // Consider a separate delete URL if needed
        deleteLink.setAttribute('data-task-id', task.id);
        deleteLink.setAttribute('parent-id', elementId);
        deleteLink.textContent = 'Delete';
        deleteLink.classList.add('delete-btn');

        deleteLink.addEventListener('click', async (event) => {
            event.preventDefault();
            const taskId = event.target.getAttribute('data-task-id');
            const parentElementId = event.target.getAttribute('parent-id');
            const deleteStatus = await deleteTaskRequest(taskId);
             if (!deleteStatus) {  x
                return;
            } 
            document.querySelector(`#${parentElementId}`).remove();
        });
    
        // Append elements
        taskElement.appendChild(taskNameSpan); // Checkmark or empty
        linksContainer.appendChild(editLink);
        linksContainer.appendChild(deleteLink);
        
        taskElement.appendChild(linksContainer); // Add links to the task element
        tasksContainer.appendChild(taskElement);
    }); 
}