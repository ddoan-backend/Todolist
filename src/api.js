const Api = 'http://localhost:3000/job'

export async function GetTask() {
    try {
        const res = await fetch(Api)
        const tasks = await res.json()
        return tasks
    } catch (error) {
        console.error("loi khi lay du lieu",error)
        alert('khong the ket noi server')
    }
}
/* function add task */
export async function AddTask(newTask) {
    try {
        const form ={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        }
    const res = await fetch(Api,form)
    } catch (error) {
        console.log('co loi khi them task',error)
        alert('khong the them task')
    }
}
/* function for delete */

export async function DeleteTask(id) {
    try {
        const option ={
            method:'DELETE'
        }
    const res = await fetch(`${Api}/${id}`,option)
    } catch (error) {
        console.log('co loi khi xoa task',error)
        alert('khong the xoa task')
    }
}

/* function for edit */

export async function EditTask(id,newTask) {
    try {
        const option ={
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        }
    const res = await fetch(`${Api}/${id}`,option)
    } catch (error) {
        console.log('co loi khi edit task',error)
        alert('khong the edit task')
    }
}