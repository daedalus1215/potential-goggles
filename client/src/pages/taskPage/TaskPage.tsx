import { useRef } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { Button, SaveButton, TopBar } from "../../components";
import ms from 'pretty-ms';
import TextAreaAdapter from "../../components/textAreaAdapter/TextAreaAdapter";
import { Task } from "../../interfaces";
import DateTimeButton from "../dateTimePage/DateTimeButton";
import { Link } from "react-router-dom";
import styles from './TaskPage.module.css';

const TaskPage = () => {
    const task = useLoaderData() as Task;
    const descRef = useRef(null);

    if (!task) {
        throw new Response("", {
            status: 404,
            statusText: "Task not found!",
        });
    }
    const original = (task?.time && ms(task.time, { secondsDecimalDigits: 2 })) ?? 0
    return (
        <div id="contact" className="contact">
            <div className="contactRight">
                <div className="contactButtons">
                    <h2 className={styles.h2}>{task.title}</h2>
                    <div data-test-id="fractionHour">{`Hours: ${original}`}</div>
                    <Link to={`/date-time/${task._id}`}>Date Time</Link>
                    <Form
                        method="post"
                        action={`/task/${task._id}`}
                        className={styles.form}>
                        <input type="hidden" name="id" value={task._id} />

                        <TextAreaAdapter reference={descRef} value={task.description} />
                        <SaveButton />
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default TaskPage;

