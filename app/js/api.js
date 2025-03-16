const authRequest = async (payload) => {
  
    const requestConfig = { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload),  
    };
    const response = await fetch(window.env.BACKEND_URLS.LOGIN_URL, requestConfig);
  
    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json(); 
    if (data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('authToken', data.token);
        return true
    }

    return false;
}


const logoutRequest = async () => { 
     
    requestConfig = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authToken')
        },  
    }

    const response = await fetch(window.env.BACKEND_URLS.LOGOUT_URL, requestConfig);
    if (!response.ok) {
        throw new Error('Logout failed');
    }
    const data = await response.json();
    console.log('Response:', data);
    if (data.success) {
        localStorage.removeItem('username');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('authToken');
        return true;
    }
    return false;
}

const registrationRequest = async (paylaod) => {
    const requestConfig = { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload),
        credentials: "include",  // Send cookies if needed // Ensure CORS is enabled
        mode:'no-cors'
    };
    
    const response = await fetch(window.env.BACKEND_URLS.REGISTER_URL, requestConfig);
    if (!response.ok) {
        throw new Error('Registration failed');
    }
    const data = await response.json();
    console.log('Response:', data);

    return data.success;
}

const addTaskRequest = async (payload) => { 
    const requestConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authToken')
        }, 
        body: JSON.stringify(payload),
                credentials: "include",  // Send cookies if needed // Ensure CORS is enabled
        credentials: "include"  // Send cookies if needed
    };  

    const response = await fetch(window.env.BACKEND_URLS.TASK_URL, requestConfig);
    if (!response.ok) {
        throw new Error('Task creation failed');
    }
    const data = await response.json(); 
    return data.success;
}

const getTasksRequest = async () => {
    const authToken = localStorage.getItem('authToken');

    const requestConfig = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
        }, 
                credentials: "include",  // Send cookies if needed // Ensure CORS is enabled
        credentials: "include"  // Send cookies if needed
    };

    const response = await fetch(window.env.BACKEND_URLS.TASK_URL, requestConfig);
     
    if (!response.ok) {
        throw new Error('Task retrieval failed');
    }
    const data =  await response.json();
   
    return data;
}

const getTakRequest = async (taskId) => {
    const authToken = localStorage.getItem('authToken');
    const requestConfig = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
        },
        credentials: "include",  // Send cookies if needed // Ensure CORS is enabled
        mode:'no-cors'
    };

    const response = await fetch(`${window.env.BACKEND_URLS.TASK_URL}/${taskId}`, requestConfig);
    if (!response.ok) {
        throw new Error('Task retrieval failed');
    }
    const data = await response.json();
    console.log('Response:', data);
    return data.task;
}

const updateTaskRequest = async (taskId, payload) => { 
    
    const requestConfig = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authToken')
        }, 
        body: JSON.stringify(payload),
        mode: "cors",  // Ensure CORS is enabled
        credentials: "include"  // Send cookies if needed
    };  
 
    const response = await fetch(`${window.env.BACKEND_URLS.TASK_URL}${taskId}`, requestConfig);
    if (!response.ok) {
        throw new Error('Task update failed');
    }
    const data = await response.json();
    console.log('Response:', data);
    return data.success;
}

const deleteTaskRequest = async (taskId) => { 
    const requestConfig = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('authToken')
        },
        mode: "cors",  // Ensure CORS is enabled
        credentials: "include"  // Send cookies if needed
    };

    const response = await fetch(`${window.env.BACKEND_URLS.TASK_URL}${taskId}`, requestConfig);
    if (!response.ok) {
        throw new Error('Task deletion failed');
    } 
    
    return true;
}   
