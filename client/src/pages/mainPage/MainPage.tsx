import { Outlet, useNavigation, useNavigate, useLoaderData, useSubmit, Form, useParams } from 'react-router-dom'
import cn from 'classnames'
import { Task } from '../../interfaces'
import Sidebar from './sidebar/Sidebar'
import { useContext } from 'react'
import IconButton from '@/components/iconButton/IconButton'

import { Category } from '@/components/button/Button'
import { useSmallScreenSize } from '@/hooks/useSmallScreenSize'
import TagButton from '@/components/tagButton/TagButton'
import HomeButton from '@/components/homeButton/HomeButton'
import { ExpandedContext } from '@/ExpandedContext'

import styles from './MainPage.module.css';
import NavigateButton from '@/components/navigateButton/NavigateButton'

const MainPage = () => {
  const { tasks, q, selectedId } = useLoaderData() as { tasks: Task[]; q: string; selectedId: string }
  const navigation = useNavigation()
  const params = useParams();
  const navigate = useNavigate();
  const isSmallScreen = useSmallScreenSize();
  const { isExpanded, setIsExpanded } = useContext(ExpandedContext);
  const dontShowOutlet = isSmallScreen && isExpanded;

  console.log('navigation path', params?.taskId)

  return (<>
    <Sidebar
      classNames={cn({ [styles.smallScreenSidebar]: isSmallScreen })}
      tasks={tasks}
      q={q}
      selectedId={selectedId}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded} />
    <div id="detail" className={cn(styles.detail,
      {
        [styles.loading]: navigation.state === 'loading'
      })
    }>
      {!dontShowOutlet && (<div className={styles.homeButtons}>
        <IconButton
          category={Category.info}
          icon="bi bi-card-list"
          onClick={() => {
            navigate('/');
            setIsExpanded(!isExpanded)
          }}
        />
        <HomeButton />
        <Form method="post" className={styles.newForm}>
          <input type="hidden" name="formId" value="newTask" />
          <IconButton type="submit" icon="bi-plus-square-fill" category={Category.accent} />
        </Form>
        <TagButton />
        <NavigateButton icon={'bi bi-bar-chart-fill'} url={'stats'} style={styles.bar} />
      </div>)}
      {!dontShowOutlet && <Outlet />}
    </div>
  </>
  )
}

export default MainPage
