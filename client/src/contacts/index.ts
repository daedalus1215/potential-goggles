import { Task, TypedResponse } from '../interfaces'
import fetchApiData from '../utils/fetchApiData'

export const getContactsSearch = async (name?: string): Promise<Task[]> => {
    console.log('3.1')
    const results = (await fetch('http://localhost:3001/api/tasks')) as TypedResponse<Task[]>
    console.log('3.2')
    if (!results.ok) throw new Error('Something went wrong!')
    console.log('3.3')
    const tasks = await results.json()
    console.log('3.4')
    console.log('name', name)

    console.log('tasks', tasks)
  if (!name) {
    return tasks
  } else {
    return tasks.filter((task: Task) => task?.title?.toLowerCase().includes(name.toLowerCase()))
  }
}
