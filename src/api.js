const Api = "http://localhost:3000/job"

/* function for get data */
export async function GetData() {
    const res = await fetch(Api)
    if(res.ok){
        const data = await res.json()
        return data
    }
}

/* function for add data */
export async function addNewTask(newtask,status) {
    const option = {
        method: "POST",
        headers: {
                "Content-Type": "application/json"
                 },
        body: JSON.stringify({name:newtask,status:status})
    }
    const res = await fetch(Api,option)
}
/* function for delete data */
export async function DeleteTask(id) {
    const option = {
        method:"DELETE"
    }
    const res = await fetch(`${Api}/${id}`,option)
}
/* function for edit data */
export async function EditTask(id,form) {
    const option = {
        method: "PATCH",
        headers: {
                "Content-Type": "application/json"
                 },
        body: JSON.stringify(form)
    }
    const res = await fetch(`${Api}/${id}`,option)
}