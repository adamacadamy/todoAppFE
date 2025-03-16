 

document.addEventListener('DOMContentLoaded', () => { 
    

    const loginForm = document.querySelector('#login-form');
    const fieldsToValidate = [{ 'field': 'username', "validator": validateUsername }, { 'field': 'password', "validator": validatePassword }]

    fieldsToValidate.forEach(({ field, validator }) => {
        const input = document.getElementById(field);
        input.addEventListener('input',  (event) => { 
            showValidationMessage(input, validator(event.target.value));
        });
        input.addEventListener('blur',  (event) => { 
            showValidationMessage(input, validator(event.target.value));
        });
    });

 
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        
        const submitButton = document.querySelector('#submit');
        const usernameElement = document.querySelector('#username');
        const passwordElement = document.querySelector('#password');
        
        submitButton.disabled = true;
        submitButton.value = 'Logging in...';
        
        const username = usernameElement.value;
        const password = passwordElement.value;

        const usernameValidation = validateUsername(username);
        const passwordValidation = validatePassword(password); 

        showValidationMessage(usernameElement, usernameValidation);
        showValidationMessage(passwordElement, passwordValidation);

        if (!usernameValidation.isValid || !passwordValidation.isValid) {
            showFormError('Please fix the errors below', loginForm);
            return;
        }
 
        const method = 'POST'; 
        const headers = { 'Content-Type': 'application/json' };
        const body = JSON.stringify({ username , password });
        const request_config = { method, headers, body };

        try {

            const authStatus = await authRequest(request_config);
            
            if (!authStatus) {   
                showFormError('Invalid credentials' , loginForm );
                return;
            }
            window.location.href = window.env.PAGES.DASHBOARD;
        } catch (error) {
            console.error('Error:', error);
            validateionData = { isValid: false, message: error.message };
            showFormError(error.message, loginForm );
        } 
        
        submitButton.disabled = false;
        submitButton.value = 'Log In';
    });


});
