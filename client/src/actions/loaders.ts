import { parseMutationArgs } from '@tanstack/react-query'
import { getContactsSearch } from '../contacts'
import { DateParams, Params, DateTime } from '../interfaces'
import { fetchTask } from './actions'

// @TODO: Move this
export async function searchLoader({ request }: any) {
  console.log('1')
  const url = new URL(request.url)
  console.log('2')
  const q = url.searchParams.get('q') as string
  console.log('3')
  const tasks = await getContactsSearch(q)
  console.log('4')
  return { tasks, q }
}

export async function taskLoader({ params }: Params) {
  const task = await fetchTask(params.taskId)
  return task
}

export async function dateTimeLoader({ params }: DateParams) {
  const task = await fetchTask(params.taskId)

  return {
    dateTime: task.dateTimes.find((dateTime) => dateTime.id === params.dateTimeId),
    taskId: params.taskId,
  }
}
