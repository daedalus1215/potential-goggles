import { useMemo, useRef, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import TextAreaAdapter from "../../components/textAreaAdapter/TextAreaAdapter";
import { createContact, getContact, Params, Task } from "../../contacts";

export async function contactLoader({ params }: Params) {
    const contact = await getContact(params.contactId);
    return contact;
}

export async function action() {
    const contact = await createContact();
    return contact;
}

const ContactPage = () => {
    const task = useLoaderData() as Task;
    const descRef = useRef(null);

    if (!task) {
        throw new Response("", {
            status: 404,
            statusText: "Task not found!",
        });
    }

    return (
        <div id="contact" className="contact">
            <div className="contactRight">
                <div className="contactButtons">
                    <Form
                        method="post"
                        action={`/contacts/${task._id}`}
                        className="formEdit">
                        {/* add projectId drop down */}
                        {/* add tags drop down */}
                        <input type="hidden" name="id" value={task._id} />
                        <button type="submit" className="button">Save</button>
                        <TextAreaAdapter reference={descRef} value={task.description} />
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

