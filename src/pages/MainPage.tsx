import {
    Form,
    Link,
    Outlet,
    useLoaderData
} from "react-router-dom";
import { createContact, getContacts } from "../contacts";

export async function mainLoader() {
    const contacts = await getContacts();
    return { contacts };
}

export async function action() {
    const contact = await createContact();
    return { contact };
}

export default function MainPage() {
    const { contacts } = useLoaderData();

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact: any) => (
                                <li key={contact.id}>
                                    <Link to={`contacts/${contact.id}`}>
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {contact.favorite && <span>★</span>}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail">
                <div id="detail">
                    <Outlet />
                </div>
            </div>
        </>
    );
}