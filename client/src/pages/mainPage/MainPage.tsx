import { Outlet, useNavigation, useLoaderData } from 'react-router-dom'
import cn from 'classnames'
import { Task } from '../../interfaces'
import Sidebar from './sidebar/Sidebar'
import { useContext } from 'react'
import { useSmallScreenSize } from '@/hooks/useSmallScreenSize'
import { ExpandedContext } from '@/ExpandedContext'
import styles from './MainPage.module.css';
import { NavigationBar } from '@/components/navigationBar/NavigationBar'

const MainPage = () => {
  const { tasks, q, selectedId } = useLoaderData() as { tasks: Task[]; q: string; selectedId: string }
  const navigation = useNavigation()
  const isSmallScreen = useSmallScreenSize();
  const { isExpanded, setIsExpanded } = useContext(ExpandedContext);
  const dontShowOutlet = isSmallScreen && isExpanded;

  return (<>
    {!isSmallScreen && <NavigationBar
      dontShowOutlet={dontShowOutlet}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
      isSmallScreen={isSmallScreen}
    />}
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
      {isSmallScreen && <NavigationBar
        dontShowOutlet={dontShowOutlet}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        isSmallScreen={isSmallScreen}
      />}
      {!dontShowOutlet && <Outlet />}
    </div>
  </>
  )
}

export default MainPage
