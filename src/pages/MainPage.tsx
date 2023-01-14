import {
    Form,
    Link,
    Outlet,
    useLoaderData
} from "react-router-dom";
import { Contact, createContact, getContacts } from "../contacts";

export async function mainLoader() {
    const contacts = await getContacts();
    return { contacts };
}

export async function action() {
    const contact = await createContact();
    return { contact };
}

export default function MainPage() {
    const { contacts } = useLoaderData() as { contacts: Contact[] };

    return (
        <>
            <div id="sidebar" className="sidebar">
                <div  className="formSearch">
                    <input className="search" placeholder="Search"></input>
                </div>
                <div>
                    <Form method="post">
                        <button type="submit" className="button">New</button>
                    </Form>
                </div>
                <nav className="navbar">
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
            <div id="detail" className="detail">
                <div id="detail">
                    <Outlet />
                </div>
            </div>
        </>
    );
}