import { useState } from "react";
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
    const [description, setDescription] = useState(task.description);

    if (!task) {
        throw new Response("", {
            status: 404,
            statusText: "Task not found!",
        });
    }

    const onChange = (value: string) => {
        setDescription(value);
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
                        <input type="hidden" name="description" value={description} />
                        <button type="submit" className="button">Save</button>
                        <TextAreaAdapter value={description} onChange={onChange} />
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

