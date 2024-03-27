import React, { useEffect, useRef, useState } from "react";
import ms from 'pretty-ms';
import cn from "classnames";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { TextAreaAdapter, IconButton, TopBar } from "@/components";
import { Category } from "@/components/button/Button";
import { useSetTitle, useListenForSave, useSmallScreenSize } from '@/hooks';

import styles from './TaskPage.module.css';
import DefaultEditor from "react-simple-wysiwyg";

const FORM_ID = "taskForm";

const TaskPage: React.FC = () => {
    const { task, options } = useLoaderData() as any;
    const [description, setDescription] = useState<string>(task.description);
    const [title, setTitle] = useState<string>(task.title);

    // We must do this be cause description was not getting reset in the editor.
    useEffect(() => {
        setDescription(task.description);
    }, [task.description]);
    useEffect(() => {
        setTitle(task.title);
    }, [task.title]);

    const navigate = useNavigate();
    const reference = useRef(task.taskId);
    const isSmallScreen = useSmallScreenSize();
    useListenForSave(FORM_ID);

    if (!task) {
        throw new Response("", {
            status: 404,
            statusText: "Task not found!",
        });
    }
    const original = (task?.time && ms(task.time, { secondsDecimalDigits: 2 })) ?? 0

    useSetTitle(task.title);
    // console.log('description', description)
    return (
        <div className="contactRight">
            <h2 className={styles.h2}><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></h2>
            <div className="contactButtons">
                <div data-test-id="fractionHour">{`Hours: ${original}`}</div>
                <TopBar>
                    <>
                        <IconButton
                            icon="bi bi-clock"
                            form={FORM_ID}
                            onClick={() => {
                                navigate(`/task/${task.taskId}/date-time`);
                            }} />

                        <Form
                            method="delete"
                            onSubmit={(event) => {
                                if (!confirm("Please confirm you want to delete this task.")) {
                                    event.preventDefault();
                                }
                            }}>
                            <input type="hidden" name="formId" value="deleteTask" />
                            <input type="hidden" name="id" value={task.taskId} />
                            <IconButton
                                icon="bi bi-trash"
                                type="submit"
                                className={styles.trashButton} />
                        </Form>
                        <IconButton
                            icon="bi bi-save"
                            category={Category.info}
                            form={FORM_ID}
                        />
                    </>
                </TopBar>
            </div>
            <Form
                id={FORM_ID}
                name={FORM_ID}
                method="post"
                action={`/task/${task.taskId}`}
                className={cn(styles.form, { [styles.smallForm]: isSmallScreen })}>
                <input type="hidden" name="id" value={task.taskId} />
                <input type="hidden" name="formId" value="updateTask" />
                {/* Need to make this multi select */}
                <select name="tags"
                    className={cn(styles.select, {
                        [styles.smallSelect]: isSmallScreen,
                        [styles.largeSelect]: !isSmallScreen
                    })}>
                    {options?.map((tag: any) => <option
                        key={tag.taskId}
                        id={tag.name}
                        value={tag.name}
                        selected={tag.selected}>
                        {tag.name}
                    </option>)}
                </select>
                <input type="hidden" name="description" value={description} ref={reference} />
                <DefaultEditor
                    // className={cn(styles.TextAreaAdapter, { [styles.TextAreaAdapterSmall]: isSmall })}
                    name={task.taskId}
                    id={task.taskId}
                    value={description}
                    key={task.taskId}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form>
        </div>
    );
};

export default TaskPage;