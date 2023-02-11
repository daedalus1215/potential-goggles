import { useRef } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { Button, TopBar } from "../../components";
import ms from 'pretty-ms';
import TextAreaAdapter from "../../components/textAreaAdapter/TextAreaAdapter";
import { Task } from "../interfaces";
import DateTimeButton from "./dateTimePage/DateTimeButton";

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
                    {/* <TopBar>
                        <>
                            { <SaveButton name={FORM_ID} /> }
                            {  }
                        </>
                    </TopBar> */}
                    <DateTimeButton task={task} />
                    <Form
                        method="post"
                        action={`/task/${task._id}`}
                        className="formEdit">
                        <TopBar>
                            <>
                                <Button className="bi bi-save" type="submit" />
                                <div data-test-id="fractionHour">{`Hours: ${original}`}</div>
                            </>
                        </TopBar>
                        <input type="hidden" name="id" value={task._id} />

                        <TextAreaAdapter reference={descRef} value={task.description} />
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default TaskPage;

