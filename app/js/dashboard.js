
 
document.addEventListener('DOMContentLoaded', async () => { 
        const addTaskForm = document.querySelector('#add-task-form'); 
        const fieldsToValidate = [{ 'field': 'task', "validator": validateText }]

        await fetchAndPapulateTasks()
       
        getTasksRequest().then((tasks) => {
            fetchAndPapulateTasks(tasks);
       }); 

        fieldsToValidate.forEach(({ field, validator }) => {
            const input = document.getElementById(field);
            input.addEventListener('input',  (event) => { 
                showValidationMessage(input, validator(event.target.value));
            });
            input.addEventListener('blur',  (event) => { 
                showValidationMessage(input, validator(event.target.value));
            });
        });

  
 
        addTaskForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const submitButton = document.querySelector('#submit');
            const taskNameElement= document.querySelector('#task');
            const isTakenElement= document.querySelector('#is_completed');   
            
            submitButton.disabled = true;
            submitButton.value = 'Adding task...';
            
            const task = taskNameElement.value;
            const is_completed = isTakenElement.checked

            const taskNameValidation = validateText(task);

            showValidationMessage(taskNameElement, taskNameValidation);

            if (!taskNameValidation.isValid) {
                showFormError('Please fix the errors below', addTaskForm);
                return;
            }

            const payload =  { task, is_completed };

            try {

                const addTaskStatus = await addTaskRequest(payload);

                if (!addTaskStatus) {   
                    showFormError('Invalid credentials' , addTaskForm );
                    return;
                }
                await fetchAndPapulateTasks();


            } catch (error) {
                console.error('Error:', error);
                validateionData = { isValid: false, message: error.message };
            } finally{
                
                addTaskForm.reset();
            }
            submitButton.disabled = false;
            submitButton.value = 'Add Task';
        });


 });

 