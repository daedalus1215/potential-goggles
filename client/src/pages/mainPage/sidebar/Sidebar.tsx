import React, { RefObject, useEffect, useRef } from 'react';
import { Form, NavLink, useSubmit } from 'react-router-dom';
import cn from 'classnames';
import { Task } from '@/interfaces';
import { useSmallScreenSize } from '@/hooks/useSmallScreenSize';

import styles from '../MainPage.module.css'

type props = {
    tasks: Task[];
    q?: string;
    selectedId?: string;
    isExpanded: boolean
    setIsExpanded: (isExpanded: boolean) => void;
    classNames: string
}

const Sidebar: React.FC<props> = ({ classNames, tasks, q, selectedId, isExpanded, setIsExpanded }) => {
    const submit = useSubmit()
    const isSmallScreenSize = useSmallScreenSize();

    const searchRef: RefObject<HTMLInputElement> = useRef<string>('');

    useEffect(() => {
        const element = document.getElementById('q') as unknown as { value: string }
        if (element?.value && q) {
            element.value = q;
        }
    }, [q])

    const render = () => {
        return isExpanded ? (<div
            id="sidebar"
            className={cn(styles.sidebar, { [styles.isExpanded]: isExpanded }, classNames)}>
            <div className={styles.searchAndNew}>
                <div className={cn(styles.searchFormWrapper, classNames)}>
                    <Form id="search-form" role="search" className={styles.formSearch} onSubmit={(event) => {
                        submit(event.currentTarget.form, {
                            replace: true,
                        })
                    }}>
                        <i className={cn('bi-search', styles.searchIcon)} />
                        <input
                            id="q"
                            ref={searchRef}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            className={cn(styles.search, classNames)}
                            name="q"
                            defaultValue={q}
                        />
                    </Form>
                </div>
            </div>


            {/* <nav className={styles.navbar}> */}
            {tasks.length ? (
                <ul className={cn(styles.taskListView, { [styles.isExpanded]: isExpanded }, classNames)}>
                    {tasks.map((task: any) => (
                        <li key={task.taskId} className={cn(styles.taskItemContainer, classNames)}>
                            <NavLink
                                key={task.id}
                                to={`task/${task.taskId}`}
                                onClick={() => {
                                    const stricterTypeRef = searchRef as { current?: { value?: '' } };
                                    // clear the search 
                                    if (stricterTypeRef?.current?.value) {
                                        stricterTypeRef.current.value = '';
                                    }
                                    if (isSmallScreenSize) {
                                        setIsExpanded(!isExpanded);
                                    }
                                }}
                                className={cn(styles.taskItem, styles.isActive, styles.isPending, classNames)}
                            >
                                {task?.title ? <>{task.title}</> : <i>No Name</i>}{' '}
                            </NavLink>
                            <div className={styles.borderContainer}>
                                <div className={cn(styles.underBorder, { [styles.underBorderSelected]: task.taskId === selectedId })} />
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
        </div>)
            : <></>
    }

    return (render());
}

export default Sidebar;