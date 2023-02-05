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
                        action="save"
                        className="formEdit">
                        <button type="submit" className="button">Save</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        className="formDelete"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit" className="button">Delete</button>
                    </Form>
                </div>
                <TextAreaAdapter value={description} onChange={onChange} />
            </div>
        </div>
    );
};

export default ContactPage;

