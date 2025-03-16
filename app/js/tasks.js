

 

document.addEventListener('DOMContentLoaded', async () => { 
    const taskId = getQueryParam('id');
    
    if (taskId) {
        await papulateTaskForm(taskId);
    }
    const taskForm = document.querySelector('#todo-form'); 
    const fieldsToValidate = [{ 'field': 'task', "validator": validateText }];

    fieldsToValidate.forEach(({ field, validator }) => {
        const input = document.getElementById(field);
        input.addEventListener('input',  (event) => { 
            showValidationMessage(input, validator(event.target.value));
        });
        input.addEventListener('blur',  (event) => { 
            showValidationMessage(input, validator(event.target.value));
        });
    });

    taskForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitButton = document.querySelector('#submit');
        const taskNameElement= document.querySelector('#task');
        const isTakenElement= document.querySelector('#is_completed');   
        
        submitButton.disabled = true;
        submitButton.value = 'Updating task...';
        
        const task = taskNameElement.value;
        const is_completed = isTakenElement.checked

        const taskNameValidation = validateText(task);

        showValidationMessage(taskNameElement, taskNameValidation);

        if (!taskNameValidation.isValid) {
            showFormError('Please fix the errors below', taskForm);
            return;
        }

        const payload =  { task, is_completed };

        try {

            const addTaskStatus = taskId ? await updateTaskRequest(taskId, payload) : await addTaskRequest(payload);

            if (!addTaskStatus) {   
                showFormError('Invalid credentials' , taskForm );
                return;
            }
            window.location.href = window.env.PAGES.DASHBOARD;
        } catch (error) {
            console.error('Error:', error);
            validateionData = { isValid: false, message: error.message };
            showFormError(error.message, taskForm );
        } 
        
    submitButton.disabled = false;
    submitButton.value = 'Update task';
    });


});