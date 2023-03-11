import { Outlet, useNavigation, useLoaderData, useSubmit } from 'react-router-dom'
import cn from 'classnames'
import { Task } from '../../interfaces'
import Sidebar from './sidebar/Sidebar'

const MainPage = () => {
  const { tasks, q, selectedId } = useLoaderData() as { tasks: Task[]; q: string; selectedId: string }
  const navigation = useNavigation()

  return (
    <>
      <Sidebar tasks={tasks} q={q} selectedId={selectedId} />
      <div id="detail" className={cn('detail', navigation.state === 'loading' ? 'loading' : '')}>
        <Outlet />
      </div>
    </>
  )
}

export default MainPage
