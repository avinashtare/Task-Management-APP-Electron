// Function to store a todo in localStorage
const storeTodo = (todo) => {
    // Retrieve existing todos from localStorage or initialize with an empty object
    let todos = JSON.parse(localStorage.getItem('todos')) || {};

    // Generate a unique key for the new todo
    const key = generateRandomString(5);

    // Add the new todo to the todos object
    todos[key] = todo;

    // Store the updated todos object back in localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to update an existing todo in localStorage
const updateTodo = (key, updatedFields) => {
    // Retrieve existing todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || {};

    // Check if the todo with the given key exists
    if (todos[key]) {
        // Merge the existing todo with the updated fields
        todos[key] = { ...todos[key], ...updatedFields };

        // Store the updated todos object back in localStorage
        localStorage.setItem('todos', JSON.stringify(todos));
    } else {
        console.log(`Todo with key ${key} does not exist.`);
    }
};

// Function to get all todos from localStorage
const getTodos = () => {
    // Retrieve todos from localStorage or return an empty object if not present
    const todos = JSON.parse(localStorage.getItem('todos')) || {};
    return todos;
};

// Function to delete a todo by key
const deleteTodo = (key) => {
    // Retrieve existing todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || {};

    // Delete the todo with the specified key
    delete todos[key];

    // Store the updated todos object back in localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
};

// get rnadom string 
const generateRandomString = (length) =>
    Array.from({ length }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 62)]).join('');

// get current date 
const getFormattedDate = () => {
    const now = new Date();

    // Helper function to pad single-digit numbers with leading zeros
    const pad = (number) => (number < 10 ? '0' + number : number);

    // Extract date and time components
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1); // Months are zero-based
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = pad(now.getMinutes());

    // Determine AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour format to 12-hour format
    const hours12 = hours % 12 || 12;

    // Format the date and time
    return `${day}-${month}-${year} ${pad(hours12)}:${minutes} ${period}`;
};