let priorityState = "all";

// add task-box evnets 
const addTodoEvents = () => {
    let taskBoxes = document.querySelectorAll(".task-box");

    const allEvnetHandler = (event) => {
        event.removeEventListener("click", allEvnetHandler)

        event.addEventListener("click", (event) => {
            // check for delete
            if (event.target.classList[0] == "ri-delete-bin-line") {
                let key = event.target.parentNode.parentNode.parentNode.getAttribute("todo-id")
                // getting delete key
                if (typeof (key) == 'string') {
                    deleteTodo(key);
                    displayTask()
                }
            }
            // check for checkbox
            else if (event.target.type == "checkbox") {
                let key = event.target.parentNode.parentNode.parentNode.getAttribute("todo-id")
                let selected = event.target.checked;
                // getting delete key
                if (typeof (key) == 'string') {
                    updateTodo(key, { selected: selected });
                    displayTask()
                }
            }
        });
    }

    Array.from(taskBoxes).forEach(allEvnetHandler)
}

// handle set data
const displayTask = () => {
    // let todos = localStorage.
    let taskList = document.getElementById("taskList")
    taskList.innerHTML = "";

    const todos = getTodos();

    let totalTodsShow = 0;

    for (key in todos) {
        let todo = todos[key]
        let priority = todo.priority.toLowerCase();
        let selected = todo.selected;
        let des = todo.des;
        let time = todo.time;
        // && (priorityState != "in progress" && !selected))
        if (priorityState === "all" ||
            (priorityState === "in progress" && !selected) ||
            (priorityState === "completed" && selected) ||
            priorityState === priority) {
            taskList.innerHTML += ` 
                <div class="task-box" todo-id="${key}">
                    <div class="left">
                      <div class="circle ${priority}"></div>
                      <div class="delete">
                        <i class="ri-delete-bin-line"></i>
                      </div>
                      <div class="check-box">
                        <input type="checkbox" ${selected ? "checked" : null}/>
                        <span class="checkmark"></span>
                      </div>
                      <div class="info">
                        <span>${des}</span>
                        <span>${time}</span>
                      </div>
                    </div>
                    <div class="right">
                      <div class="expand">
                        <i class="ri-arrow-drop-down-line"></i>
                      </div>
                    </div>
                  </div>`
        }

        totalTodsShow++;
    }

    if (totalTodsShow == 0) {
        taskList.innerHTML += `<span class="empy-message">There is noting here.....</span>`;
    }
    else {
        // add evnet to elements
        addTodoEvents()
    }
}

// handle click add new task
const addNewTask = () => {
    let des = document.getElementById("new-des");
    let priority = document.getElementById("new-priority");
    let currentDate = getFormattedDate();

    // Validation
    if (des.value.trim() === "") {
        alert("Description cannot be empty.");
        des.focus();  // Focus on the description input for user correction
        return;
    }

    des.value = des.value.replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/&/g, "&amp;");

    let priorityValue = priority.selectedOptions.length > 0
        ? priority.selectedOptions[0].value
        : 'No priority selected';

    if (priorityValue === 'No priority selected') {
        alert("Please select a priority.");
        priority.focus();  // Focus on the priority select for user correction
        return;
    }

    const values = { des: des.value, priority: priorityValue, selected: false, time: currentDate };
    // Set value in localstorage
    storeTodo(values)


    des.value = "";

    // Update todos
    displayTask();
}

// handle Maximized bar button 
const handleMaxAndRezise = async () => {
    let isMaximize = await window.electronAPI.isMaximized();

    (isMaximize) ? window.electronAPI.resize() : window.electronAPI.maximize();
}

// handle screen change for task and add task screen
const showTaskScreen = (isShow) => {
    const tasksScreen = document.querySelector(".tasks-screen")
    const addTaskScreen = document.querySelector(".add-task-screen")
    if (isShow) {
        tasksScreen.style.display = "block"
        addTaskScreen.style.display = "none"
    }
    else {
        tasksScreen.style.display = "none"
        addTaskScreen.style.display = "block"
    }
}

const changePriorityState = (e) => {
    if (e.srcElement.classList[0] !== "actions") return;
    let elem = e.srcElement;
    Array.from(priorityAction.children).forEach((e) => e.classList.remove("active"))
    elem.classList.add("active")
    priorityState = elem.innerText.toLowerCase()
    displayTask()
}

// when user click on add new task 
const addNewTaskBtn = document.getElementById("addNewTaskBtn")
addNewTaskBtn.addEventListener("click", addNewTask)

// add new task btn to open screen 
const newTaskBtn = document.getElementById("newTaskBtn")
newTaskBtn.addEventListener("click", () => showTaskScreen(false))

// go back white createing new task
let addTaskBackBtn = document.getElementById("addTaskBackBtn")
addTaskBackBtn.addEventListener("click", () => showTaskScreen(true))

// when user click on up priory actions 
let priorityAction = document.getElementById("priorityAction")
priorityAction.addEventListener("click", changePriorityState)

document.addEventListener("DOMContentLoaded", () => {
    displayTask()
})