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
    return await res.json()
    } catch (error) {
        console.log('co loi khi them task',error)
        alert('khong the them task')
    }
}