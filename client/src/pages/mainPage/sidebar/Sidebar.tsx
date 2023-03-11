import React, { useEffect } from 'react';
import { Form, NavLink, useSubmit } from 'react-router-dom';
import cn from 'classnames';
import styles from '../MainPage.module.css'
import { Task } from '@/interfaces';

type props = {
    tasks: Task[];
    q?: string;
    selectedId?: string
}

const Sidebar: React.FC<props> = ({ tasks, q, selectedId }) => {
    const submit = useSubmit()

    useEffect(() => {
        const element = document.getElementById('q') as unknown as { value: string }
        if (element.value && q) {
            element.value = q;
        }
    }, [q])

    const onChange = (event: any) => {
        const isFirstSearch = q == null
        submit(event.currentTarget.form, {
            replace: !isFirstSearch,
        })
    }

    return (
        <div id="sidebar" className={styles.sidebar}>
            <div className={styles.searchAndNew}>
                <div className={styles.searchFormWrapper}>
                    <Form id="search-form" role="search" className={styles.formSearch}>
                        <i className={cn('bi-search', styles.searchIcon)} />
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            className={styles.search}
                            name="q"
                            defaultValue={q}
                            onChange={onChange}
                        />
                    </Form>
                </div>
            </div>


            {/* <nav className={styles.navbar}> */}
            {tasks.length ? (
                <ul className={styles.taskListView}>
                    {tasks.map((task: any) => (
                        <li key={task._id} className={styles.taskItemContainer}>
                            <NavLink
                                key={task.id}
                                to={`task/${task._id}`}
                                className={cn(styles.taskItem, styles.isActive, styles.isPending)}
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
            {/* </nav> */}
        </div>
    );
}

export default Sidebar;