import { GetData,addNewTask,DeleteTask,EditTask } from "./api.js";
import { main,BtnAdd,BtnDelete,BtnEdit,BtnSave} from "./dom.js";
async function start(){
    const data = await GetData()
    renderTask(data)
}
start()
/* render data */
async function renderTask(data) {
    main.innerHTML = ""
    const html = data.map(task=>{
        return `
        <div class="task flex gap-2 items-center border-b border-black py-2" data-id=${task.id}>
            <div class="checked w-6 h-6 border border-black rounded-full"></div>
            <p class="flex-1">${task.name}</p>
            <span class="butonEdit"><i class="fa-solid fa-pen"></i></span>
            <span class="butonX"><i class="fa-solid fa-x"></i></span>
        </div> 
        `
    })
    main.innerHTML = html.join("")
}
/* add new task */
BtnAdd.addEventListener("click",async()=>{
    const input = document.querySelector(".input")
    const newvalue = input.value.trim()
    if(newvalue === "")return alert("vui long nhap task")
    await addNewTask(newvalue,"pending")
    start()
})
/* render new task */
main.addEventListener("click",async(e)=>{
    const task = e.target.closest(".task")
    const id = task.dataset.id
    if(e.target.closest(".butonX")){
        await DeleteTask(id)
    }
    const modal = document.querySelector(".modal")
    if(e.target.closest(".butonEdit")){
        modal.classList.remove("hidden")
        await handleEdit(id)
    }
    if(e.target.closest(".checked")){
        const checked = document.querySelector(".checked")
        checked.classList.toggle("bg-red-500")
    }
})

async function handleEdit(id) {
    BtnSave.addEventListener("click",async()=>{
        const form ={
            name:document.querySelector(".inputedit").value.trim()
        }
    await EditTask(id,form)
    })
}

