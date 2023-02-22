import { useRef } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { Button, SaveButton, TopBar } from "../../components";
import ms from 'pretty-ms';
import TextAreaAdapter from "../../components/textAreaAdapter/TextAreaAdapter";
import { Task } from "../../interfaces";
import DateTimeButton from "../dateTimePage/DateTimeButton";
import { Link } from "react-router-dom";
import styles from './TaskPage.module.css';
import classNames from "classnames";

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
                    <Button>
                        <Link to={`/date-time/${task._id}`} className={styles.dateTimeButton}>Date Time</Link>
                    </Button>
                    <Form method="delete">
                        <input type="hidden" name="formId" value="deleteTask" />
                        <input type="hidden" name="id" value={task._id} />
                        <Button type="submit"><i className={classNames("bi bi-trash", styles.trash)} ></i></Button>
                    </Form>
                    <Form
                        method="post"
                        action={`/task/${task._id}`}
                        className={styles.form}>
                        <input type="hidden" name="id" value={task._id} />
                        <input type="hidden" name="formId" value="updateTask" />

                        <TextAreaAdapter reference={descRef} value={task.description} />
                        <SaveButton />
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default TaskPage;

