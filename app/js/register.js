 

document.addEventListener('DOMContentLoaded', () => { 
    const registrationForm = document.querySelector('#registration-form');
    const fieldsToValidate = [
        { 'field': 'username', "validator": validateUsername },
        { 'field': 'password', "validator": validatePassword }, 
        { 'field': 'email', "validator": validateEmail }
    ];

    fieldsToValidate.forEach(({ field, validator }) => {
        const input = document.getElementById(field);
        input.addEventListener('input',  (event) => { 
            showValidationMessage(input, validator(event.target.value));
        });
        input.addEventListener('blur',  (event) => { 
            showValidationMessage(input, validator(event.target.value));
        });
    }
    );

    registrationForm.addEventListener('submit', async (event) => { 
        event.preventDefault();

        const submitButton = document.querySelector('#submit');
        const usernameElement = document.getElementById('username');
        const passwordElement = document.getElementById('password');
        const emailElement = document.getElementById('email');

        submitButton.disabled = true;
        submitButton.value = 'Registering...';

        const username = usernameElement.value;
        const password = passwordElement.value;
        const email = emailElement.value;

        const usernameValidation = validateUsername(username);
        const passwordValidation = validatePassword(password);
        const emailValidation = validateEmail(email);

        showValidationMessage(usernameElement, usernameValidation);
        showValidationMessage(passwordElement, passwordValidation);
        showValidationMessage(emailElement, emailValidation);

        if (!usernameValidation.isValid || !passwordValidation.isValid || !emailValidation.isValid) {
            showFormError('Please fix the errors below', registrationForm);
            return;
        }

        const method = 'POST';
        const headers = { 'Content-Type': 'application/json' };
        const body = JSON.stringify({ username, password, email });
        const request_config = { method, headers, body };   
        
        try {

            const registrationStatus = await registrationRequest(request_config);
            if (!registrationStatus) { 
                showFormError('Invalid payload', registrationForm);
                return;
            }
            window.location.href = window.env.PAGES.LOGIN;
        } catch (error) {
            console.error('Error:', error);
            validateionData = { isValid: false, message: error.message };
            showFormError(error.message, registrationForm);
        } 

        submitButton.disabled = false;
        submitButton.value = 'Register';
   
    });
});

