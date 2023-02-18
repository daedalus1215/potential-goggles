import { Form, NavLink, Outlet, useNavigation, useLoaderData, useSubmit } from 'react-router-dom'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { Task } from '../interfaces'

import styles from './MainPage.module.css'

const MainPage = () => {
  const { tasks, q, selectedId } = useLoaderData() as { tasks: Task[]; q: string }
  const navigation = useNavigation()
  const submit = useSubmit()

  useEffect(() => {
    const element = document.getElementById('q') as unknown as { value: string }
    element.value = q
  }, [q])

  const onChange = (event: any) => {
    const isFirstSearch = q == null
    submit(event.currentTarget.form, {
      replace: !isFirstSearch,
    })
  }
  return (
    <>
      <div id="sidebar" className="sidebar">
        <div className="top">
          <Form id="search-form" role="search" className="formSearch">
            <i className={cn('bi-search', 'searchIcon')} />
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              className={cn('search')}
              name="q"
              defaultValue={q}
              onChange={onChange}
            />
          </Form>
          <Form method="post" className="newForm">
            {/* @TODO: Left off here with the newTaskForm, we need to catch this and create a new task */}
            <button type="submit" className="button">
              New
            </button>
          </Form>
        </div>
        <nav className={styles.navbar}>
          {tasks.length ? (
            <ul className={styles.taskListView}>
              {tasks.map((task: any) => (
                <li key={task._id} className={styles.taskContainer}>
                  <NavLink
                    key={task.id}
                    to={`task/${task._id}`}
                    className={cn(styles.isActive, styles.isPending, styles.taskItem)}
                  >
                    {task?.title ? <>{task.title}</> : <i>No Name</i>}{' '}
                  </NavLink>
                  <div className={styles.borderContainer}>
                    <div className={cn(styles.underBorder, { [styles.underBorderSelected]: task._id === selectedId })} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={cn('detail', navigation.state === 'loading' ? 'loading' : '')}>
        <Outlet />
      </div>
    </>
  )
}

export default MainPage
