import { Outlet, useNavigation, useLoaderData, useSubmit, Form } from 'react-router-dom'
import cn from 'classnames'
import { Task } from '../../interfaces'
import Sidebar from './sidebar/Sidebar'
import { useState } from 'react'
import IconButton from '@/components/iconButton/IconButton'

import styles from './MainPage.module.css';
import { Category } from '@/components/button/Button'

const MainPage = () => {
  const { tasks, q, selectedId } = useLoaderData() as { tasks: Task[]; q: string; selectedId: string }
  const navigation = useNavigation()
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <Sidebar tasks={tasks} q={q} selectedId={selectedId} isExpanded={isExpanded} />
      <div id="detail" className={cn('detail', navigation.state === 'loading' ? 'loading' : '')}>
        <IconButton
        category={Category.info}
          icon="bi bi-card-list"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <Form method="post" className={styles.newForm}>
          <input type="hidden" name="formId" value="newTask" />
          <IconButton type="submit" icon="bi-plus-square-fill" category={Category.accent} />
        </Form>
        <Outlet />
      </div>
    </>
  )
}

export default MainPage
