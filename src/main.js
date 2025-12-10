import { GetData,addNewTask } from "./api.js";
import { main,BtnAdd } from "./dom.js";
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
        <div class="flex gap-2 items-center border-b border-black" data-id=${task.id}>
            <div class="checked w-6 h-6 bg-white rounded-full"></div>
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
