import React, { useRef } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { Button, SaveButton, TopBar } from "@/components";
import ms from 'pretty-ms';
import TextAreaAdapter from "@/components/textAreaAdapter/TextAreaAdapter";
import { Task } from "@/interfaces";
import styles from './TaskPage.module.css';
import HomeButton from "@/components/homeButton/HomeButton";
import IconButton from "@/components/iconButton/IconButton";

const TaskPage: React.FC = () => {
    const task = useLoaderData() as Task;
    const descRef = useRef(null);
    const navigate = useNavigate();

    if (!task) {
        throw new Response("", {
            status: 404,
            statusText: "Task not found!",
        });
    }
    const original = (task?.time && ms(task.time, { secondsDecimalDigits: 2 })) ?? 0
    return (
        <div className="contactRight">
            <HomeButton />
            <h2 className={styles.h2}>{task.title}</h2>
            <div className="contactButtons">
                <div data-test-id="fractionHour">{`Hours: ${original}`}</div>
                <TopBar>
                    <>
                        <IconButton
                            icon="bi bi-clock"
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
                    </>
                </TopBar>
            </div>

            <Form
                method="post"
                action={`/task/${task._id}`}
                className={styles.form}>
                <input type="hidden" name="id" value={task._id} />
                <input type="hidden" name="formId" value="updateTask" />

                <TextAreaAdapter reference={descRef} value={task.description} />
                <SaveButton className={styles.left} />
            </Form>
        </div>
    );
};

export default TaskPage;

