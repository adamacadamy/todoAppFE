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
 