const BACKEND_ENTRY_URL = "http://127.0.0.1:5000"
window.env = {
    BACKEND_URLS:{
        REFERAL_URL: `${BACKEND_ENTRY_URL}/`, 
        LOGIN_URL: `${BACKEND_ENTRY_URL}/auth/login`,
        LOGOUT_URL: `${BACKEND_ENTRY_URL}/auth/logout`,
        REGISTER_URL: `${BACKEND_ENTRY_URL}/auth/register`,
        TASK_URL: `${BACKEND_ENTRY_URL}/task/`, 
    },
    PAGES:{
        DASHBOARD: 'dashboard.html',
        LOGIN: 'login.html',
        TODO_EDIT: 'todo_edit.html'
    }

};
