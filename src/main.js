import { GetTask , AddTask,DeleteTask,EditTask } from "./api.js";
import { main,input,addBtn,modal, BtnSave,inputedit } from "./dom.js";

let currentEditId = null;

async function start() {
    const tasks = await GetTask()
    renderTask(tasks)
}
start()

function renderTask(tasks){
    main.innerHTML = ''
   const html =  tasks.map(task => {
        return `
        <div class="task flex gap-2 bg-black/30 items-center rounded-2xl px-2 py-2" data-id = ${task.id}>
            <div class="checked w-6 h-6 ${task.completed? 'bg-green-300' : 'bg-white'}bg-white rounded-full border border-black"></div>
            <p class="flex-1 ${task.completed? 'line-through' : ''}">${task.name}</p>
            <span class="butonEdit"><i class="fa-solid fa-pen"></i></span>
            <span class="butonX"><i class="fa-solid fa-x"></i></span>
        </div>
        `
    });
    main.innerHTML = html.join("")
}

async function addNewTask() {
    const newvalue = input.value.trim()
    const form ={
        name:newvalue,
        completed:false
    }
    if(!newvalue){
        alert("vui long nhap day du")
        return
    }
    try {
        await AddTask(form)
        start()
        input.value = ""
    } catch (error) {
        console.error("khong the ket noi server",error)
        console.log("co loi xay ra")
    }
}

/* main listening delete anf edit */
main.addEventListener("click",async(e)=>{
    const task = e.target.closest(".task")
    if (!task) return;
    const id = task.dataset.id
    if(e.target.closest(".butonX")){
        await DeleteTask(id)
        start()
    }
    if(e.target.closest(".butonEdit")){
        currentEditId = id
        modal.classList.remove("hidden")
    }
})
BtnSave.addEventListener("click", async () => {
    const newvalue = inputedit.value.trim();
    if (!newvalue) {
        alert("vui long nhap task");
        return;
    }

    await EditTask(currentEditId, { name: newvalue });
    inputedit.value = "";
    modal.classList.add("hidden");
    start();
});


addBtn.addEventListener("click", addNewTask)
/* modal close */
modal.addEventListener("click", (e) => {
    if (!document.querySelector("#modalContent").contains(e.target)) {
        modal.classList.add("hidden")
    }
})
