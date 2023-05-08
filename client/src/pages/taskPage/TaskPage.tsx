import React, { useRef } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { SaveButton, TopBar } from "@/components";
import ms from 'pretty-ms';
import TextAreaAdapter from "@/components/textAreaAdapter/TextAreaAdapter";
import { Task } from "@/interfaces";
import styles from './TaskPage.module.css';
import HomeButton from "@/components/homeButton/HomeButton";
import IconButton from "@/components/iconButton/IconButton";
import { Category } from "@/components/button/Button";
import cn from "classnames";
import { useSmallScreenSize } from "@/hooks/useSmallScreenSize";

const TaskPage: React.FC = () => {
    const { task, tags } = useLoaderData() as any;
    const descRef = useRef(null);
    const navigate = useNavigate();
    const isSmallScreen = useSmallScreenSize();
    
    console.log('tags', tags);
    if (!task) {
        throw new Response("", {
            status: 404,
            statusText: "Task not found!",
        });
    }
    const original = (task?.time && ms(task.time, { secondsDecimalDigits: 2 })) ?? 0
    return (
        <div className="contactRight">
            <h2 className={styles.h2}>{task.title}</h2>
            <div className="contactButtons">
                <div data-test-id="fractionHour">{`Hours: ${original}`}</div>
                <TopBar>
                    <>
                        <IconButton
                            icon="bi bi-clock"
                            form="taskForm"
                            onClick={() => {
                                navigate(`/date-time/${task._id}`);
                            }} />

                        <Form method="delete" onSubmit={(event) => {
                            if (!confirm("Please confirm you want to delete this task.")) {
                                event.preventDefault();
                            }
                        }}>
                            <input type="hidden" name="formId" value="deleteTask" />
                            <input type="hidden" name="id" value={task._id} />
                            <IconButton
                                icon="bi bi-trash"
                                type="submit"
                                className={styles.trashButton} />
                        </Form>
                        <IconButton
                            icon="bi bi-save"
                            category={Category.info}
                            form="taskForm"
                        />
                    </>
                </TopBar>
            </div>

            <Form
                id="taskForm"
                name="taskForm"
                method="post"
                action={`/task/${task._id}`}
                className={cn({ [styles.form]: isSmallScreen })}>
                <input type="hidden" name="id" value={task._id} />
                <input type="hidden" name="formId" value="updateTask" />
                
                {tags.map((tag: any) => <label>{tag.name}<input type="checkbox" key={tag._id} checked={false}/></label>)}
                
                <TextAreaAdapter reference={descRef} value={task.description} />
            </Form>
        </div>
    );
};

export default TaskPage;

