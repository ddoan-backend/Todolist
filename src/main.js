import { GetTask , AddTask } from "./api.js";
import { main,input,addBtn } from "./dom.js";

async function start() {
    const tasks = await GetTask()
    renderTask(tasks)
}
start()

function renderTask(tasks){
    main.innerHTML = ""
    tasks.forEach(task => {
        const taskDiv = createElement(task)
        main.appendChild(taskDiv)
    });
}

/* function for creative element */
function createElement(task){
    const taskDiv = document.createElement('div')
    taskDiv.className = 'flex gap-2 bg-black/30 items-center rounded-2xl px-3 py-2';
    taskDiv.dataset.id = task.id

    taskDiv.innerHTML = `
            <div class="checked w-6 h-6 ${task.completed? 'bg-green-500' : 'bg-white'} bg-white rounded-full"></div>
            <p class="flex-1 ${task.completed?'line-through' : ''}">${task.name}</p>
            <span class="butonEdit"><i class="fa-solid fa-pen"></i></span>
            <span class="butonX"><i class="fa-solid fa-x"></i></span>
    `
    return taskDiv
}

async function addNewTask() {
    const nameTask = input.value.trim()

    if(!nameTask){
        alert('vui long nhap noi dung')
        return
    }

    const form ={
        name: nameTask,
        completed:false
    }

    try {
        const newTask = await AddTask(form)
        const taskDiv = createElement(newTask)
        main.appendChild(taskDiv)
        input.value = ""
    } catch (error) {
        console.error('loi',error)
        alert('khong the them task')
    }
}
addBtn.addEventListener("click",addNewTask)