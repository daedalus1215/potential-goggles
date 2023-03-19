import { Outlet, useNavigation, useLoaderData, useSubmit, Form } from 'react-router-dom'
import cn from 'classnames'
import { Task } from '../../interfaces'
import Sidebar from './sidebar/Sidebar'
import { useEffect, useRef, useState } from 'react'
import IconButton from '@/components/iconButton/IconButton'

import styles from './MainPage.module.css';
import { Category } from '@/components/button/Button'
import { useSmallScreenSize } from '@/hooks/useSmallScreenSize'
import TagButton from '@/components/tagButton/TagButton'
import HomeButton from '@/components/homeButton/HomeButton'

const MainPage = () => {
  const { tasks, q, selectedId } = useLoaderData() as { tasks: Task[]; q: string; selectedId: string }
  const navigation = useNavigation()
  const [isExpanded, setIsExpanded] = useState(true);
  const isSmallScreen = useSmallScreenSize();
  const dontShowOutlet = isSmallScreen && isExpanded;

  return (
    <>
      <Sidebar classNames={cn({ [styles.smallScreenSidebar]: isSmallScreen })} tasks={tasks} q={q} selectedId={selectedId} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div id="detail" className={cn('detail', navigation.state === 'loading' ? 'loading' : '')}>
        {!dontShowOutlet && (<div className={styles.homeButtons}>
          <IconButton
            category={Category.info}
            icon="bi bi-card-list"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <HomeButton />
          <Form method="post" className={styles.newForm}>
            <input type="hidden" name="formId" value="newTask" />
            <IconButton type="submit" icon="bi-plus-square-fill" category={Category.accent} />
          </Form>
          <TagButton />
        </div>)}
        {!dontShowOutlet && <Outlet />}
      </div>
    </>
  )
}

export default MainPage
